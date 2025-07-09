import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { NavigationProps } from '../../types/navigationType.ts';
import { Button, Divider } from '@ui-kitten/components';
import TopNavigationOpe from '../../components/MainComponents/TopNavigationOpe.tsx';
import QuestionTypeSelector from '../../components/LearnComponents/question/QuestionTypeSelector.tsx';
import QuestionContentEditor from '../../components/LearnComponents/question/QuestionContentEditor.tsx';
import MultipleChoiceEditor from '../../components/LearnComponents/question/MultipleChoiceEditor.tsx';
import FillInBlankEditor from '../../components/LearnComponents/question/FillInBlankEditor.tsx';
import JudgementEditor from '../../components/LearnComponents/question/JudgementEditor.tsx';
import ShortAnswerEditor from '../../components/LearnComponents/question/ShortAnswerEditor.tsx';
import AnalysisEditor from '../../components/LearnComponents/question/AnalysisEditor.tsx';
import QuestionTypeDisplay from '../../components/LearnComponents/question/QuestionTypeDisplay.tsx';
import TagsEditor from '../../components/LearnComponents/question/TagsEditor.tsx';
import { useOpeQuestionStore } from '../../stores/opeQuestion.store.ts';
import { useQuestionStore } from '../../stores/question.store.ts';

const OpeQuestion: React.FC<NavigationProps> = ({ navigation, route }) => {
    const opeType = route.params.type;

    return (
        <SafeAreaView style={styles.safeArea}>
            <TopNavigationOpe
                title={'创建新题目'}
                navigation={navigation}
                renderItemAccessory={() => <></>}
            />
            <Divider />
            <ScrollView style={styles.container}>
                {opeType === 'create' ? <QuestionTypeSelector/> :
                    opeType === 'update' ? <QuestionTypeDisplay /> :
                        <Text>显示出错</Text>}

                <QuestionContentEditor />

                <QuestionBodyEditors />

                <AnalysisEditor />

                {opeType === 'create' ? <></> :
                    opeType === 'update' ? <TagsEditor /> :
                        <Text>显示出错</Text>}

                {opeType === 'create' ? <NextStepButton navigation={navigation} /> :
                    opeType === 'update' ? <SaveStepButton navigation={navigation} /> :
                        <Text>显示出错</Text>}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const QuestionBodyEditors = () => {
    const selectedType = useOpeQuestionStore(state => state.questionType);

    return (
        <>
            <View style={[
                { display: selectedType !== '单选题' && selectedType !== '多选题' ? 'none' : 'flex' },
            ]}>
                <MultipleChoiceEditor />
            </View>

            <View style={[
                { display: selectedType !== '填空题' ? 'none' : 'flex' },
            ]}>
                <FillInBlankEditor />
            </View>

            <View style={[
                { display: selectedType !== '判断题' ? 'none' : 'flex' },
            ]}>
                <JudgementEditor />
            </View>

            <View style={[
                { display: selectedType !== '简答题' ? 'none' : 'flex' },
            ]}>
                <ShortAnswerEditor />
            </View>
        </>
    );
};

const NextStepButton = ({ navigation }: { navigation: any }) => {
    const isNextDisabled = useOpeQuestionStore(state => state.isOpeDisabled);

    // 获取题型对应的题干
    const getQuestionBody = useOpeQuestionStore(state => {
        switch (state.questionType) {
            case '单选题':
            case '多选题': return state.options;
            case '填空题': return state.blanks;
            case '判断题': return state.correctAnswer;
            case '简答题': return state.shortAnswer;
            default: return null;
        }
    });

    const handleNext = () => {
        const state = useOpeQuestionStore.getState();
        navigation.navigate('CreateQuestionTag', {
            question: {
                type: state.questionType,
                content: state.questionContent,
                body: getQuestionBody,
                analysis: state.questionAnalysis,
            },
        });
    };

    return (
        <Button style={styles.endButton} onPress={handleNext} disabled={isNextDisabled}>
            <Text style={styles.endButtonText}>下一步</Text>
        </Button>
    );
};

const SaveStepButton = ({ navigation }: { navigation: any }) => {
    const isSaveDisabled = useOpeQuestionStore(state => state.isOpeDisabled);
    const updateQuestion = useQuestionStore(state => state.updateQuestion);

    // 获取题型对应的题干
    const getQuestionBody = useOpeQuestionStore(state => {
        switch (state.questionType) {
            case '单选题':
            case '多选题': return state.options;
            case '填空题': return state.blanks;
            case '判断题': return state.correctAnswer;
            case '简答题': return state.shortAnswer;
            default: return null;
        }
    });

    // 处理保存
    const handleSave = () => {
        const state = useOpeQuestionStore.getState();
        const newQuestion = {
            questionId: state.questionId,
            content: state.questionContent,
            body: getQuestionBody,
            analysis: state.questionAnalysis,
            tags: state.questionTags,
            lastModified: new Date().toISOString(),
        };

        updateQuestion(newQuestion);

        navigation.goBack();
    };

    return (
        <Button style={styles.endButton} onPress={() => handleSave()} disabled={isSaveDisabled}>
            <Text style={styles.endButtonText}>保存</Text>
        </Button>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    endButton: {
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
        marginTop: 16,
        // backgroundColor: '#3366FF',
    },
    endButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    editorContainer: {
        marginBottom: 20,
    },
    hidden: {
        display: 'none',
        height: 0, // 确保不占用布局空间
        margin: 0,
        padding: 0,
    },
});

export default OpeQuestion;
