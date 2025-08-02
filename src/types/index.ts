// 定义整个应用的路由参数类型
export type RootStackParamList = {
    AppMain: undefined;

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

    TestPage: undefined;
};
