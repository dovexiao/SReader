import React from 'react';
import {
    Text, View,
} from 'react-native';
import {NavigationProps} from '../../types/navigationType.ts';

const SocializeMain: React.FC<NavigationProps> = ({ navigation }) => {
    return (
        <View style={{  }}>
            <Text>发现模块</Text>
        </View>
    );
};

export default SocializeMain;
