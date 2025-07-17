import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStart from './AppStart.tsx';
import AppLogin from './AuthScreen/AppLogin.tsx';
import AppRegister from './AuthScreen/AppRegister.tsx';
import AppMain from './AppMain.tsx';
import PersonCenter from './PersonScreen';
import TestPage from './TestPage.tsx';
import QuestionBank from './LearnScreen/QuestionBank.tsx';
import QuestionDetail from './LearnScreen/QuestionDetail.tsx';
import OpeQuestion from './LearnScreen/OpeQuestion.tsx';
import CreateQuestionTag from './LearnScreen/CreateQuestionTag.tsx';
import NoteLibrary from './LearnScreen/NoteLibrary.tsx';
import NoteDetail from './LearnScreen/NoteDetail.tsx';
import OpeNote from './LearnScreen/opeNote.tsx';
import CreatePost from './SocializeScreen/CreatePost.tsx';

const { Navigator, Screen } = createNativeStackNavigator();

const HomeNavigator = () => (
    <Navigator initialRouteName="AppMain" screenOptions={{headerShown: false}}>
        <Screen name="AppStart" component={AppStart} />
        <Screen name="AppLogin" component={AppLogin} />
        <Screen name="AppRegister" component={AppRegister} />
        <Screen name="AppMain" component={AppMain} />
        <Screen name="PersonCenter" component={PersonCenter} />
        <Screen name="QuestionBank" component={QuestionBank} />
        <Screen name="QuestionDetail" component={QuestionDetail} initialParams={{ id: null }} />
        <Screen name="OpeQuestion" component={OpeQuestion} initialParams={{ type: null }} />
        <Screen name="CreateQuestionTag" component={CreateQuestionTag} initialParams={{ question: null }} />
        <Screen name="NoteLibrary" component={NoteLibrary} />
        <Screen name="NoteDetail" component={NoteDetail} initialParams={{ id: null }} />
        <Screen name="OpeNote" component={OpeNote} />
        <Screen name="TestPage" component={TestPage} />
        {/*<Screen name="CreatePost" component={CreatePost} />*/}
    </Navigator>
);

export const AppStackNavigator = () => (
    <NavigationContainer>
        <HomeNavigator />
    </NavigationContainer>
);
