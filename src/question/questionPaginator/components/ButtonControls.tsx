import React from 'react';
import { StyleSheet, View } from 'react-native';
import { usePagerController } from './PagerController.tsx';
import { Button } from '@ui-kitten/components';
import { useQuestionPaginatorStore } from '../stores';

const ButtonControls: React.FC = () => {
    const { goPrev, goNext } = usePagerController();
    const currentPage = useQuestionPaginatorStore(state => state.currentPage);
    const pageCount = useQuestionPaginatorStore(state => state.pageCount);

    return (
        <View style={styles.container}>
            <Button
                // style={styles.button}
                appearance="ghost"
                style={[styles.button, currentPage === 0 && styles.disabledButton]}
                onPress={goPrev}
                disabled={currentPage === 0}
            >
                上一题
                {/*<Text style={styles.controlText}>上一页</Text>*/}
            </Button>

            <Button
                // style={styles.button}
                appearance="ghost"
                style={[styles.button, currentPage === pageCount - 1 && styles.disabledButton]}
                onPress={goNext}
                disabled={currentPage === pageCount - 1}
            >
                下一题
                {/*<Text style={styles.controlText}>下一页</Text>*/}
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // padding: 16,
        // backgroundColor: '#f8f9fa',
        // borderTopWidth: 1,
        // borderTopColor: '#e9ecef',
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#FFFFFF',
    },
});

export default ButtonControls;
