import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStart from './AppStart.tsx';
import AppLogin from './AuthScreen/AppLogin.tsx';
import AppRegister from './AuthScreen/AppRegister.tsx';
import AppMain from './AppMain.tsx';
// import PersonCenter from './PersonScreen';
import TestPage from './TestPage.tsx';
import QuestionBank from './LearnScreen/QuestionBank.tsx';
import QuestionDetail from './LearnScreen/QuestionDetail.tsx';
import OpeQuestion from './LearnScreen/OpeQuestion.tsx';
import CreateQuestionTag from './LearnScreen/CreateQuestionTag.tsx';
import NoteLibrary from '../src/note/noteLibrary/screens/NoteLibrary.tsx';
import NoteReader from '../src/note/noteReader/screens/NoteReader.tsx';
import EditNote from '../src/note/editNote/screens/EditNote.tsx';
// import SocializeMain from './SocializeScreen';
import CreateNoteTag from '../src/note/createNote/screens/CreateNoteTag.tsx';
import AddNoteCover from '../src/note/createNote/screens/AddNoteCover.tsx';
import AddNoteContent from '../src/note/createNote/screens/AddNoteContent.tsx';
import {RootStackParamList} from '../src/types';
// import CreatePost from './SocializeScreen/CreatePost.tsx';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => (
    <Navigator initialRouteName="AppMain" screenOptions={{headerShown: false}}>
        {/*<Screen name="AppStart" component={AppStart} />*/}
        {/*<Screen name="AppLogin" component={AppLogin} />*/}
        {/*<Screen name="AppRegister" component={AppRegister} />*/}
        <Screen name="AppMain" component={AppMain} />
        {/*<Screen name="PersonCenter" component={PersonCenter} />*/}
        {/*<Screen name="QuestionBank" component={QuestionBank} />*/}
        {/*<Screen name="QuestionDetail" component={QuestionDetail} initialParams={{ id: null }} />*/}
        {/*<Screen name="OpeQuestion" component={OpeQuestion} initialParams={{ type: null }} />*/}
        {/*<Screen name="CreateQuestionTag" component={CreateQuestionTag} initialParams={{ question: null }} />*/}
        {/* 笔记模块*/}
        <Screen name="NoteLibrary" component={NoteLibrary} />
        <Screen name="NoteReader" component={NoteReader} initialParams={{ noteId: '' }} />
        <Screen name="AddNoteCover" component={AddNoteCover} />
        <Screen name="AddNoteContent" component={AddNoteContent} />
        <Screen name="CreateNoteTag" component={CreateNoteTag} />
        <Screen name="EditNote" component={EditNote} />
        {/*测试页面*/}
        <Screen name="TestPage" component={TestPage} />
        {/*<Screen name="SocializeMain" component={SocializeMain} />*/}
        {/*<Screen name="CreatePost" component={CreatePost} />*/}
    </Navigator>
);

export const AppStackNavigator = () => (
    <NavigationContainer>
        <HomeNavigator />
    </NavigationContainer>
);
