import { create } from 'zustand';
import {questions} from '../assets/questions.ts';

export type QuestionType = '单选题' | '多选题' | '判断题' | '填空题' | '简答题';

export type Question = {
    questionId: string;
    type: QuestionType;
    createdAt: string;
    lastModified: string;
    content: string;
    body: any;
    analysis: string;
    tags: string[];
};

interface QuestionStore {
    questions: Question[],
    createQuestion: (question: Question) => void;
    updateQuestion: (question: any) => void;
}

export const useQuestionStore = create<QuestionStore>((set, get) => ({
    questions: questions as Question[],
    createQuestion: (question: Question) => {
        const newQuestionId = generateQuestionId(get().questions[get().questions.length - 1].questionId);
        set((state) => ({
            questions: [...state.questions, { ...question, questionId: newQuestionId }],
        }));
    },
    updateQuestion: (question: any) => {
        set((state) => ({
            questions: state.questions.map((q) => (q.questionId === question.questionId ? {...q, ...question} : q)),
        }));
    },
}));

const generateQuestionId = (questionId: string) => {
    const match = questionId.match(/^Q(\d+)$/);
    if (!match) {
        return 'Q001';
    }

    let numberPart = parseInt(match[1], 10) + 1;
    const paddedNumber = numberPart.toString().padStart(3, '0');
    return `Q${paddedNumber}`;
};

