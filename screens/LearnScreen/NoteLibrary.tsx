import React from 'react';
import {
    Text,
} from 'react-native';
import {NavigationProps} from '../../types/navigationType.ts';

const NoteLibrary: React.FC<NavigationProps> = ({ navigation }) => {
    return (
        <Text>笔记库</Text>
    );
};

export default NoteLibrary;
