import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export const useBackHandler = (handler: () => boolean) => {
    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handler);
            return () => BackHandler.removeEventListener('hardwareBackPress', handler);
        }, [handler])
    );
};
