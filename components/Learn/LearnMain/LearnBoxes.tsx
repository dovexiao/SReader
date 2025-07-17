import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "@ui-kitten/components";
import { NavigationProps } from "../../../types/navigationType.ts";
import QuestionBank from "../../../screens/LearnScreen/QuestionBank.tsx";
import NoteLibrary from "../../../screens/LearnScreen/NoteLibrary.tsx";

// 定义学习模块类型
type StudyModule = {
    id: string;
    title: string;
    description: string;
    count: string;
    lastUpdated: string;
    icon: string;
    backgroundColor: string;
    countColor: string;
    countTextColor: string;
    screen: React.FC<NavigationProps>;
};

const studyModules: StudyModule[] = [{
    id: '1',
    title: '笔记库',
    description: '写一篇笔记梳理你的学习知识',
    count: '12 notes',
    lastUpdated: 'Today',
    icon: 'file-text-outline',
    backgroundColor: '#E55A2B',
    countColor: '#FFF3E0',
    countTextColor: '#E55A2B',
    screen: NoteLibrary,
}, {
    id: '2',
    title: '题目库',
    description: '刷一道题目巩固你的学习知识',
    count: '67 exercises',
    lastUpdated: 'Today',
    icon: 'book-open-outline',
    backgroundColor: '#4F7CFF',
    countColor: '#E3EDFF',
    countTextColor: '#4F7CFF',
    screen: QuestionBank,
// }, {
//     id: '3',
//     title: '学有声',
//     description: '听一段录音充实你的学习知识',
//     count: '12 recording',
//     lastUpdated: 'Today',
//     icon: 'headphones-outline',
//     backgroundColor: '#4CAF50',
//     countColor: '#E8F5E8',
//     countTextColor: '#4CAF50',
}];

const renderStudyModule = (item: StudyModule, index: number, navigation: any) => (
    <TouchableOpacity
        style={styles.card}
        key={item.id || `module-${index}`}
        onPress={() => navigation.navigate(item.screen)}
    >
        <View style={styles.cardContainer}>
            <View style={[styles.icon, { backgroundColor: item.backgroundColor }]}>
                <Icon
                    name={item.icon}
                    fill="#FFFFFF"
                    width={28} height={28}
                />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.time}>{item.lastUpdated}</Text>
                </View>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.moduleStats}>
                    <View style={[styles.countBadge, { backgroundColor: item.countColor }]}>
                        <Text style={[styles.countText, { color: item.countTextColor }]}>
                            {item.count}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

const LearnBoxes: React.FC<NavigationProps> = ({ navigation }) => (
    <View style={styles.container}>
        {studyModules.map((item, index) => renderStudyModule(item, index, navigation))}
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 10,
    },
    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    contentContainer: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    time: {
        fontSize: 12,
        color: '#999',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    moduleStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 12,
    },
    countText: {
        fontSize: 12,
        fontWeight: '600',
    },
});

export default LearnBoxes;
