import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStart from './AppStart.tsx';
import AppLogin from './AuthScreen/AppLogin.tsx';
import AppRegister from './AuthScreen/AppRegister.tsx';
import AppMain from './AppMain.tsx';
import PersonCenter from './PersonScreen';
import TestPage from './TestPage.tsx';

const { Navigator, Screen } = createNativeStackNavigator();

const HomeNavigator = () => (
    <Navigator initialRouteName="AppMain" screenOptions={{headerShown: false}}>
        <Screen name="AppStart" component={AppStart} />
        <Screen name="AppLogin" component={AppLogin} />
        <Screen name="AppRegister" component={AppRegister} />
        <Screen name="AppMain" component={AppMain} />
        <Screen name="PersonCenter" component={PersonCenter} />
        <Screen name="TestPage" component={TestPage} />
    </Navigator>
);

export const AppStackNavigator = () => (
    <NavigationContainer>
        <HomeNavigator/>
    </NavigationContainer>
);
