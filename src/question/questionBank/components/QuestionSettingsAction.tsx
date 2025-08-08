import { Text } from '@ui-kitten/components';
import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useGlobal } from '@contexts/GlobalContext.tsx';
import { useQuestionStore } from '@/question/questionBank/stores';
import DeleteQuestionAction from '@/question/questionBank/components/DeleteQuestionAction.tsx';

type ColumnCount = 1 | 2 | 3 | 4;

export const QuestionSettingsAction = ({
    cardId,
    // columnCount = 3 as ColumnCount,
}: {
    cardId: string,
    // columnCount?: ColumnCount,
}) => {
    const { actionDialogRef, bottomActionSheetRef } = useGlobal();
    const deleteQuestion = useQuestionStore(state => state.deleteQuestion);

    const columnCount: ColumnCount = 3;

    // 根据列数计算宽度（%）
    const getWidthByColumn = (columns: ColumnCount): number => {
        const widthMap = {
            1: 100,
            2: 45,
            3: 30,
            4: 23
        };
        return widthMap[columns];
    };

    // 生成空白占位元素（数量 = 列数 - 1）
    const renderEmptyPlaceholders = () => {
        const placeholders = [];
        for (let i = 0; i < columnCount - 1; i++) {
            placeholders.push(
                <View
                    key={`empty-${i}`}
                    style={[styles.actionObject, {
                        height: 0,
                        borderTopWidth: 0,
                        marginBottom: 0,
                        width: `${getWidthByColumn(columnCount)}%` // 保持与操作项相同宽度
                    }]}
                />
            );
        }
        return placeholders;
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>设置</Text>
            </View>
            <View style={styles.actionContent}>
                <TouchableOpacity
                    style={[styles.actionObject, { width: `${getWidthByColumn(columnCount)}%` }]}
                    onPress={() => {
                        actionDialogRef.current?.show({
                            content: <DeleteQuestionAction />,
                            onConfirm: () => {
                                deleteQuestion(cardId);
                                bottomActionSheetRef.current?.hide();
                            },
                        });
                    }}
                >
                    <Text style={styles.actionText}>删除</Text>
                </TouchableOpacity>

                {/* 渲染空白占位元素 */}
                {renderEmptyPlaceholders()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        width: '100%',
        padding: 6,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    actionContent: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap', // 允许换行
        justifyContent: 'space-around',
        padding: 12,
        paddingBottom: 20,
        backgroundColor: '#FFF',
    },
    actionObject: {
        // 宽度由动态计算传入，此处不固定
        height: 100,
        backgroundColor: '#FFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 4,
        borderTopColor: '#FD9B37',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    actionText: {
        fontSize: 14,
        // fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default QuestionSettingsAction;
