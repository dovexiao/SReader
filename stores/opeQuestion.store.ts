import { create } from 'zustand';
import { Question } from "./question.store.ts";

export type QuestionType = '单选题' | '多选题' | '填空题' | '判断题' | '简答题';

type Option = {
    id: number;
    text: string;
    checked: boolean;
};

type Blank = {
    id: number;
    text: string;
};

interface OpeQuestionStore {
    questionId: string;
    questionType: QuestionType;
    questionContent: string;
    options: Option[];
    blanks: Blank[];
    correctAnswer: number;
    shortAnswer: string;
    questionAnalysis: string;
    questionTags: string[];
    isOpeDisabled: boolean;

    // 初始化方法
    initialize: (question?: Question) => void;

    // 状态更新方法
    setQuestionType: (type: QuestionType) => void;
    setQuestionContent: (content: string) => void;
    setQuestionAnalysis: (analysis: string) => void;
    setQuestionTags: (tags: string[]) => void;

    // 选项操作
    addOption: () => void;
    removeOption: (id: number) => void;
    updateOptionText: (id: number, text: string) => void;
    updateOptionChecked: (id: number, checked: boolean) => void;

    // 填空题操作
    addBlank: () => void;
    removeBlank: (id: number) => void;
    updateBlankText: (id: number, text: string) => void;

    // 判断题操作
    setCorrectAnswer: (answer: number) => void;

    // 简答题操作
    setShortAnswer: (answer: string) => void;

    // 标签操作
    addTag: (tag: string) => void;
    removeTag: (index: number) => void;

    validateForm: () => boolean;
    reset: () => void;
}

export const useOpeQuestionStore = create<OpeQuestionStore>((set, get) => ({
    questionId: '',
    questionType: '单选题',
    questionContent: '',
    options: [
        { id: 1, text: '', checked: false },
        { id: 2, text: '', checked: false },
        { id: 3, text: '', checked: false },
        { id: 4, text: '', checked: false },
    ],
    blanks: [{ id: 1, text: '' }],
    correctAnswer: -1,
    shortAnswer: '',
    questionAnalysis: '',
    questionTags: [],
    isOpeDisabled: true,

    // 初始化表单数据
    initialize: (question?: any) => {
        const defaultQuestion = {
            questionId: '',
            type: '单选题',
            content: '',
            analysis: '',
            body: [
                { id: 1, text: '', checked: false },
                { id: 2, text: '', checked: false },
                { id: 3, text: '', checked: false },
                { id: 4, text: '', checked: false },
            ],
            tags: [],
        };

        if (!question) {
            question = defaultQuestion;
        }

        set({
            questionId: question.questionId,
            questionType: question.type,
            questionContent: question.content,
            questionAnalysis: question.analysis,
            questionTags: question.tags || [],
        });

        // 根据题型初始化不同的数据
        switch(question.type) {
            case '单选题':
            case '多选题':
                set({
                    options: question.body.map((option: any, index: number) => ({
                        id: index + 1,
                        text: option.text,
                        checked: option.checked,
                    })),
                });
                break;
            case '填空题':
                set({
                    blanks: question.body.map((blank: any, index: number) => ({
                        id: index + 1,
                        text: blank.text,
                    })),
                });
                break;
            case '判断题':
                set({ correctAnswer: question.body });
                break;
            case '简答题':
                set({ shortAnswer: question.body });
                break;
        }

        set({ isOpeDisabled: true });

        // 初始验证
        get().validateForm();
    },

    setQuestionType: (type) => {
        const currentType = get().questionType;
        if (currentType === type) {
            return;
        }

        // 重置相关状态
        const resetState: Partial<OpeQuestionStore> = {
            questionContent: '',
            questionAnalysis: '',
        };

        if (currentType === '单选题' || currentType === '多选题') {
            resetState.options = [
                { id: 1, text: '', checked: false },
                { id: 2, text: '', checked: false },
                { id: 3, text: '', checked: false },
                { id: 4, text: '', checked: false },
            ];
        } else if (currentType === '填空题') {
            resetState.blanks = [{ id: 1, text: '' }];
        } else if (currentType === '判断题') {
            resetState.correctAnswer = -1;
        } else if (currentType === '简答题') {
            resetState.shortAnswer = '';
        }

        set({
            questionType: type,
            ...resetState,
        });

        get().validateForm();
    },

    setQuestionContent: (content) => {
        set({questionContent: content});
        get().validateForm();
    },

    setQuestionAnalysis: (analysis) => {
        set({questionAnalysis: analysis});
        get().validateForm();
    },

    setQuestionTags: (tags) => {
        set({questionTags: tags});
        get().validateForm();
    },

    addOption: () => {
        const options = get().options;
        const newId = options.length > 0 ? Math.max(...options.map(o => o.id)) + 1 : 1;
        set({ options: [...options, { id: newId, text: '', checked: false }] });
        get().validateForm();
    },

    removeOption: (id) => {
        set({ options: get().options.filter(option => option.id !== id) });
        get().validateForm();
    },

    updateOptionText: (id, text) => {
        set({
            options: get().options.map(option =>
                option.id === id ? { ...option, text } : option
            ),
        });
        get().validateForm();
    },

    updateOptionChecked: (id, checked) => {
        const questionType = get().questionType;
        set({
            options: get().options.map(option => {
                if (questionType === '单选题') {
                    return option.id === id
                        ? { ...option, checked }
                        : { ...option, checked: false };
                }
                return option.id === id
                    ? { ...option, checked }
                    : option;
            }),
        });
        get().validateForm();
    },

    addBlank: () => {
        const blanks = get().blanks;
        const newId = blanks.length > 0 ? Math.max(...blanks.map(b => b.id)) + 1 : 1;
        set({ blanks: [...blanks, { id: newId, text: '' }] });
        get().validateForm();
    },

    removeBlank: (id) => {
        set({ blanks: get().blanks.filter(blank => blank.id !== id) });
        get().validateForm();
    },

    updateBlankText: (id, text) => {
        set({
            blanks: get().blanks.map(blank =>
                blank.id === id ? { ...blank, text } : blank
            ),
        });
        get().validateForm();
    },

    setCorrectAnswer: (answer) => {
        set({correctAnswer: answer});
        get().validateForm();
    },

    setShortAnswer: (answer) => {
        set({shortAnswer: answer});
        get().validateForm();
    },

    addTag: (tag) => {
        if (tag.trim() !== '') {
            set({ questionTags: [...get().questionTags, tag.trim()] });
            get().validateForm();
        }
    },

    removeTag: (index) => {
        const newTags = [...get().questionTags];
        newTags.splice(index, 1);
        set({ questionTags: newTags });
        get().validateForm();
    },

    validateForm: () => {
        const state = get();
        let isValid = true;

        if (!state.questionContent.trim() || !state.questionAnalysis.trim()) {
            isValid = false;
        }

        switch (state.questionType) {
            case '单选题':
            case '多选题':
                if (state.options.some(option => !option.text.trim())) {
                    isValid = false;
                }
                if (!state.options.some(option => option.checked)) {
                    isValid = false;
                }
                if (state.questionType === '单选题' &&
                    state.options.filter(option => option.checked).length !== 1) {
                    isValid = false;
                }
                break;
            case '填空题':
                const blankCount = (state.questionContent.match(/_+/g) || []).length;
                if (state.blanks.length !== blankCount) {
                    isValid = false;
                }
                if (state.blanks.some(blank => !blank.text.trim())) {
                    isValid = false;
                }
                break;
            case '判断题':
                if (state.correctAnswer !== 0 && state.correctAnswer !== 1) {
                    isValid = false;
                }
                break;
            case '简答题':
                if (!state.shortAnswer.trim()) {
                    isValid = false;
                }
                break;
        }

        set({ isOpeDisabled: !isValid });
        return isValid;
    },

    reset: () => set({
        questionType: '单选题',
        questionContent: '',
        options: [
            { id: 1, text: '', checked: false },
            { id: 2, text: '', checked: false },
            { id: 3, text: '', checked: false },
            { id: 4, text: '', checked: false },
        ],
        blanks: [{ id: 1, text: '' }],
        correctAnswer: -1,
        shortAnswer: '',
        questionAnalysis: '',
        isOpeDisabled: true,
    }),
}));
