import React from 'react';
import {
    Text,
} from 'react-native';
import {NavigationProps} from '../../types/navigationType.ts';

const QuestionBank: React.FC<NavigationProps> = ({ navigation }) => {
    return (
        <Text>题目库</Text>
    );
};

export default QuestionBank;
