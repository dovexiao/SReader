import React from 'react';
import {
    Text,
} from 'react-native';
import {NavigationProps} from '../../types/navigationType.ts';

const PersonCenter: React.FC<NavigationProps> = ({ navigation }) => {
    return (
        <Text>个人中心</Text>
    );
};

export default PersonCenter;
