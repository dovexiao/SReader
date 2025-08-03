import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
} from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { useQuestionPaginatorStore } from '../stores';
import QuestionDetailContent from './QuestionDetailContent.tsx';
import { Question } from '../../questionBank/types';
import QuestionPagerContainer, { ContainerAPI } from './QuestionPagerContainer.tsx';
import ButtonControls from './ButtonControls.tsx';

const { width: screenWidth } = Dimensions.get('window');

interface PagerContextType {
    goNext: () => void;
    goPrev: () => void;
}

const PagerContext = createContext<PagerContextType | null>(null);

interface PagerControllerProps {
    questions: Question[];
    currentQuestionId: string;
}

export const PagerController: React.FC<PagerControllerProps> = ({
    questions,
    currentQuestionId,
}) => {
    const containerRef = useRef<ContainerAPI>(null);

    const currentPage = useQuestionPaginatorStore((state) => state.currentPage);
    const setCurrentPage = useQuestionPaginatorStore((state) => state.setCurrentPage);
    const setPageCount = useQuestionPaginatorStore((state) => state.setPageCount);

    // 翻页控制方法
    const goNext = () => {
        const nextPage = Math.min(currentPage + 1, questions.length - 1);
        containerRef.current?.scrollToPage(nextPage);
    };

    const goPrev = () => {
        const prevPage = Math.max(currentPage - 1, 0);
        containerRef.current?.scrollToPage(prevPage);
    };

    const contextValue: PagerContextType = {
        goNext,
        goPrev,
    };

    const renderItem = ({ item }: { item: Question }) => (
        <ScrollView style={{ flex: 1, width: screenWidth }}>
            <QuestionDetailContent question={item} />
        </ScrollView>
    );

    useEffect(() => {
        setCurrentPage(questions.findIndex((note) => note.questionId === currentQuestionId) || 0);
        setPageCount(questions.length);
    }, [currentQuestionId, questions, setCurrentPage, setPageCount]);

    return (
        <PagerContext.Provider value={contextValue}>
            <QuestionPagerContainer
                ref={containerRef}
                questions={questions}
                initialScrollIndex={currentPage}
                renderItem={renderItem}
            />
            <ButtonControls />
        </PagerContext.Provider>
    );
};

// Hook 用于访问控制器
export const usePagerController = () => {
    const context = useContext(PagerContext);
    if (!context) {
        throw new Error('usePagerController must be used within PagerController');
    }
    return context;
};
