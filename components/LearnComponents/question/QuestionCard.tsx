import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Question } from '../../../stores/question.store.ts';

type RootStackParamList = {
    QuestionDetail: { id: string };
    // 其他页面也可以在这里添加
}

interface QuestionCardProps {
    question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <Pressable onPress={() => navigation.navigate('QuestionDetail', { id: question.questionId })}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.questionId}>{question.questionId}</Text>
                    <Text style={styles.questionType}>{question.type}</Text>
                </View>

                {/*<Text style={styles.meta}>*/}
                {/*    创建者: {item.creator} 最近修改: {item.lastModified}*/}
                {/*</Text>*/}

                <Text style={styles.content} numberOfLines={3} ellipsizeMode={'tail'}>{question.content}</Text>

                <View style={styles.tagsContainer}>
                    {question.tags.map((tag, index) => (
                        <View
                            key={index}
                            style={[
                                styles.tag,
                                { backgroundColor: getTagColor() },
                            ]}
                        >
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Pressable>
    );
};

// 根据标签内容或索引返回不同的颜色
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

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    questionId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    questionType: {
        fontSize: 16,
        color: '#555555',
    },
    meta: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 8,
    },
    content: {
        fontSize: 14,
        color: '#444444',
        marginBottom: 12,
        lineHeight: 20,
        backgroundColor: '#F5F7FA',
        padding: 16,
        borderRadius: 8,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 4,
    },
    tagText: {
        fontSize: 12,
        color: '#555555',
    },
});

export default QuestionCard;
