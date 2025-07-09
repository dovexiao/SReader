import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { NavigationProps } from '../../types/navigationType.ts';
import { Button, CheckBox, Divider, Radio, RadioGroup, TopNavigationAction } from '@ui-kitten/components';
import TopNavigationOpe from '../../components/MainComponents/TopNavigationOpe.tsx';
import { EditIcon } from '../../components/Icon';
import { useQuestionStore } from '../../stores/question.store.ts';
import { useOpeQuestionStore } from '../../stores/opeQuestion.store.ts';
import { formatTime } from '../../utils/formatTime.ts';

const getTagColor = () => {
    const colors = [
        '#E8F5E9',
        '#E3F2FD',
        '#E8F5E9',
        '#FFF8E1',
        '#FFF8E1',
        '#F3E5F5',
        '#E0F7FA',
        '#E0F7FA',
        '#FFEBEE',
    ];

    return colors[Math.floor(Math.random() * colors.length) % 9];
};

const QuestionDetail: React.FC<NavigationProps> = ({ navigation, route }) => {
    const questionId = route.params?.id;

    const question = useQuestionStore(state => state.questions.filter(q => q.questionId === questionId)[0]);
    const initialize = useOpeQuestionStore(state => state.initialize);

    // 根据题目类型渲染不同的选项UI
    const renderOptions = () => {
        switch (question.type) {
            case '单选题':
            case '多选题':
                return (
                    <View style={styles.optionsContainer}>
                        <Text style={styles.sectionTitle}>选项</Text>
                        {question.body.map((option: any, index: number) => (
                            <View
                                key={option.id}
                                style={styles.optionRow}
                            >
                                <CheckBox
                                    style={[styles.checkbox]}
                                    checked={option.checked}
                                >
                                    <></>
                                </CheckBox>
                                <Text style={styles.optionText}>
                                    {String.fromCharCode(65 + index)}. {option.text}
                                </Text>
                            </View>
                        ))}
                    </View>
                );
            case '填空题':
                return (
                    <View style={styles.optionsContainer}>
                        <Text style={styles.sectionTitle}>答案</Text>
                        {question.body.map((blank: any, index: number) => (
                            <View key={blank.id} style={styles.answerContainer}>
                                <Text style={styles.answerNumber}>{index + 1}.</Text>
                                <View style={styles.answerBubble}>
                                    <Text style={styles.answerText}>{blank.text}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                );
            case '判断题':
                return (
                    <View style={styles.optionsContainer}>
                        <Text style={styles.sectionTitle}>答案</Text>
                        <View style={styles.judgementContainer}>
                            {/*<View*/}
                            {/*    style={styles.judgementOption}*/}
                            {/*>*/}

                            {/*    <Text style={styles.judgementText}>正确</Text>*/}
                            {/*</View>*/}
                            {/*<View*/}
                            {/*    style={styles.judgementOption}*/}
                            {/*>*/}

                            {/*    <Text style={styles.judgementText}>错误</Text>*/}
                            {/*</View>*/}
                            <RadioGroup
                                selectedIndex={question.body}
                            >
                                <Radio>
                                    正确
                                </Radio>
                                <Radio>
                                    错误
                                </Radio>
                            </RadioGroup>
                        </View>
                    </View>
                );
            case '简答题':
                return (
                    <View style={styles.optionsContainer}>
                        <Text style={styles.sectionTitle}>参考答案</Text>
                        <View style={styles.shortAnswerContainer}>
                            <Text style={styles.shortAnswerText}>
                                {question.body}
                            </Text>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    const renderItemAccessory = () => {
        return (
            <TopNavigationAction
                icon={EditIcon}
                onPress={() => {
                    initialize(question);
                    navigation.navigate('OpeQuestion', { type: 'update' });
                }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TopNavigationOpe
                title={'题目详情'}
                navigation={navigation}
                renderItemAccessory={renderItemAccessory}
            />
            <Divider />
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.questionId}>{question.questionId}</Text>
                    <Text style={styles.questionType}>{question.type}</Text>
                </View>

                <Text style={styles.creationInfo}>
                    {formatTime(question.createdAt, { format: 'datetime' })}
                </Text>

                <View style={styles.contentContainer}>
                    <Text style={styles.contentText}>{question.content}</Text>
                </View>

                {renderOptions()}

                <View style={styles.analysisContainer}>
                    <Text style={styles.sectionTitle}>解析</Text>
                    <Text style={styles.analysisText}>{question.analysis}</Text>
                </View>

                {question.tags.length > 0 && <View style={styles.tagsContainer}>
                    <Text style={styles.sectionTitle}>标签</Text>
                    <View style={styles.tagsList}>
                        {question.tags.map((tag: string, index: number) => (
                            <View
                                key={index}
                                style={[
                                    styles.tag,
                                    {backgroundColor: getTagColor()},
                                ]}
                            >
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>
                </View>}

                <View style={styles.footer}>
                    {/*<Text style={styles.footerText}>创建者: {question.creator}</Text>*/}
                    <Text style={styles.footerText}>
                        最近修改: {formatTime(question.lastModified, { format: 'datetime' })}
                    </Text>
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
            <Divider />
            <View style={styles.buttonContainer}>
                <Button appearance="ghost" style={styles.button}>上一题</Button>
                <Button appearance="ghost" style={styles.button}>下一题</Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    questionId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    questionType: {
        fontSize: 16,
        color: '#555555',
    },
    creationInfo: {
        fontSize: 12,
        color: '#888888',
        marginBottom: 16,
    },
    contentContainer: {
        backgroundColor: '#F5F7FA',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    contentText: {
        fontSize: 16,
        color: '#333333',
        lineHeight: 30,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 12,
    },
    optionsContainer: {
        marginBottom: 16,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    optionIcon: {
        marginRight: 12,
    },
    optionText: {
        fontSize: 16,
        color: '#333333',
        flex: 1,
    },
    // checkboxContainer: {
    //     width: 24,
    //     height: 24,
    //     borderWidth: 1,
    //     borderColor: '#757575',
    //     borderRadius: 4,
    //     marginRight: 12,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // checkboxContainerSelected: {
    //     borderColor: '#4CAF50',
    //     backgroundColor: '#E8F5E9',
    // },
    checkbox: {
        // width: 18,
        // height: 18,
        // borderWidth: 1,
        // borderColor: '#666',
        // borderRadius: 2,
        marginRight: 10,
    },
    answerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    answerNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginRight: 12,
        width: 20,
    },
    answerBubble: {
        backgroundColor: '#E8F5E9',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    answerText: {
        fontSize: 16,
        color: '#4CAF50',
    },
    judgementContainer: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    judgementOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
    },
    judgementText: {
        fontSize: 16,
        color: '#333333',
    },
    shortAnswerContainer: {
        backgroundColor: '#E8F5E9',
        borderRadius: 8,
        padding: 16,
    },
    shortAnswerText: {
        fontSize: 16,
        color: '#333333',
        lineHeight: 30,
    },
    analysisContainer: {
        marginBottom: 16,
    },
    analysisText: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#F5F7FA',
        fontSize: 16,
        color: '#555555',
        lineHeight: 30,
    },
    tagsContainer: {
        marginBottom: 16,
    },
    tagsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#E3F2FD',
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: {
        fontSize: 15,
        color: '#555555',
    },
    footer: {
        justifyContent: 'center',
        // borderTopWidth: 1,
        // borderTopColor: '#EEEEEE',
        // paddingTop: 12,
        marginTop: 8,
    },
    footerText: {
        fontSize: 12,
        color: '#888888',
        marginBottom: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        // margin: 8,
        padding: 12,
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default QuestionDetail;
