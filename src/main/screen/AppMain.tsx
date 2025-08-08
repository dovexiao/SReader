import React, {useEffect} from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    BackHandler,
} from 'react-native';
import TopAvatarColumn from '@/main/components/TopAvatarColumn.tsx';
import LearnMain from '@/main/components/LearnMain.tsx';
import { Divider } from '@ui-kitten/components';
import PanSwipeResponder from '@/main/components/PanSwipeResponder.tsx';
import { useGlobal } from '@/contexts/GlobalContext.tsx';
import { AppMainProps } from '@/main/types';
import ConfirmExit from '@/main/components/ConfirmExit.tsx';

const AppMain: React.FC<AppMainProps> = ({ navigation }) => {
    const { personCenterRef, actionDialogRef, avatarActionsModalRef } = useGlobal();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (personCenterRef.current?.getVisible()) {
                if (avatarActionsModalRef.current?.getVisible()) {
                    avatarActionsModalRef.current?.hide();
                }
                personCenterRef.current?.hide();
                return true;
            } else {
                actionDialogRef.current?.show({
                    content: <ConfirmExit />,
                });
                return true;
            }
        });

        return () => backHandler.remove();
    }, [actionDialogRef, personCenterRef]);

    const handleRightSwipe = () => {
        personCenterRef.current?.show();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={'rgba(255,255,255,0)'} translucent={true} />
            <View style={{ height: StatusBar.currentHeight, backgroundColor: '#ffffff'}} />
            <View style={{ flex: 1, position: 'relative' }}>
                <TopAvatarColumn />
                <Divider/>
                <PanSwipeResponder
                    onSwipeRight={handleRightSwipe}
                    threshold={60} // 自定义滑动阈值
                    minVelocity={0.7} // 自定义最小速度
                >
                    <LearnMain />
                </PanSwipeResponder>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});

export default AppMain;
