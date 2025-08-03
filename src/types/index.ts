// 定义整个应用的路由参数类型
export type RootStackParamList = {
    AppMain: undefined;
    // 笔记模块
    NoteLibrary: undefined;
    NoteReader: {
        noteId: string;
    };
    AddNoteCover: undefined;
    AddNoteContent: undefined;
    CreateNoteTag: {
        note: any;
    };
    EditNote: {
        noteId: string;
    };
    // 题目模块
    QuestionBank: undefined;
    QuestionPaginator: {
        questionId: string;
    },
    OpeQuestion: {
        type: 'create' | 'update' | '';
        questionId: string;
    };
    CreateQuestionTags: {
        question: any;
    },
    // 测试模块
    TestPage: undefined;
};
