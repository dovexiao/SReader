import React from'react';
import {Text, Icon, useTheme} from '@ui-kitten/components';
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ScrollView
} from'react-native';

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
};

// 定义最近活动类型
type RecentActivity = {
    id: string;
    type: string;
    entityTitle: string;
    entityType: string;
    time: string;
    icon: string;
    dotColor: string;
};

interface ChatMainProps {
    navigation: any;
}

const LearnMain: React.FC<ChatMainProps> = ({ navigation }) => {
    const themes = useTheme();

    const studyModules: StudyModule[] = [
        {
            id: '1',
            title: '学汇录',
            description: '写一篇笔记梳理你的学习知识',
            count: '12 notes',
            lastUpdated: 'Today',
            icon: 'file-text-outline',
            backgroundColor: '#E55A2B',
            countColor: '#FFF3E0',
            countTextColor: '#E55A2B',
        },
        {
            id: '2',
            title: '学研题',
            description: '做一道题目巩固你的学习知识',
            count: '67 exercises',
            lastUpdated: 'Today',
            icon: 'book-open-outline',
            backgroundColor: '#4F7CFF',
            countColor: '#E3EDFF',
            countTextColor: '#4F7CFF',
        },
        {
            id: '3',
            title: '学有声',
            description: '听一段录音充实你的学习知识',
            count: '12 recording',
            lastUpdated: 'Today',
            icon: 'headphones-outline',
            backgroundColor: '#4CAF50',
            countColor: '#E8F5E8',
            countTextColor: '#4CAF50',
        },
    ];

    const recentActivities: RecentActivity[] = [
        {
            id: '1',
            type: '浏览',
            entityTitle: 'JavaScript Fundamentals',
            entityType: '笔记',
            time: 'Today',
            icon: 'eye-outline',
            dotColor: '#E55A2B',
        },
        {
            id: '3',
            type: '新增',
            entityTitle: 'System Design',
            entityType: '录音',
            time: 'Today',
            icon: 'plus-outline',
            dotColor: '#4CAF50',
        },
        {
            id: '4',
            type: '编辑',
            entityTitle: 'React Hooks Guide',
            entityType: '题目',
            time: 'Today',
            icon: 'edit-2-outline',
            dotColor: '#4F7CFF',
        },
    ];

    const renderStudyModule = (item: StudyModule, index: number) => (
        <TouchableOpacity
            style={styles.moduleCard}
            key={item.id || `module-${index}`}
        >
            <View style={styles.moduleHeader}>
                <View style={[styles.moduleIcon, { backgroundColor: item.backgroundColor }]}>
                    <Icon
                        name={item.icon}
                        fill="#FFFFFF"
                        width={28} height={28}
                    />
                </View>
                <View style={styles.moduleContent}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.moduleTitle}>{item.title}</Text>
                        <Text style={styles.moduleInfo}>{item.lastUpdated}</Text>
                    </View>
                    <Text style={styles.moduleDescription}>{item.description}</Text>
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

    const renderActivity = (item: RecentActivity, index: number) => (
        <TouchableOpacity
            style={styles.activityItem}
            key={item.id || `activity-${index}`}
        >
            <View style={styles.activityIcon}>
                <Icon
                    name={item.icon}
                    fill={item.dotColor}
                    width={18} height={18}
                />
            </View>
            <View style={styles.activityContent}>
                <Text style={styles.activityType}>{item.type}</Text>
                <Text style={styles.activityTitle}>{item.entityTitle}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
            </View>
            <View style={styles.activityRight}>
                <View style={[styles.activityDot, { backgroundColor: item.dotColor }]} />
                <Icon
                    name="chevron-right-outline"
                    fill={item.dotColor}
                    width={16} height={16}
                />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <ScrollView>
                <View style={styles.modulesContainer}>
                    {studyModules.map((item, index) => renderStudyModule(item, index))}
                </View>

                <View style={styles.recentSection}>
                    <View style={styles.recentHeader}>
                        <View style={styles.recentTitleContainer}>
                            <Text style={styles.recentTitle}>最近操作</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={[styles.viewAllText, { color: themes['color-primary-500'] }]}>详情</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomStats}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>7</Text>
                            <Text style={styles.statLabel}>笔记</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>48</Text>
                            <Text style={styles.statLabel}>题目</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>6</Text>
                            <Text style={styles.statLabel}>录音</Text>
                        </View>
                    </View>

                    <View style={styles.activitiesList}>
                        {recentActivities.map((item, index) => renderActivity(item, index))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    modulesContainer: {
        padding: 20,
        paddingBottom: 10,
    },
    moduleCard: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    moduleHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moduleIcon: {
        width: 60,
        height: 60,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    moduleContent: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    moduleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    moduleDescription: {
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
    moduleInfo: {
        fontSize: 12,
        color: '#999',
    },
    recentSection: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        paddingVertical: 20,
    },
    recentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    recentTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 8,
    },
    viewAllText: {
        fontSize: 14,
        color: '#4F7CFF',
        fontWeight: '600',
    },
    activitiesList: {
        flex: 1,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    activityIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    activityContent: {
        flex: 1,
    },
    activityType: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    activityTitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    activityTime: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    activityRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    activityDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    bottomStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
    },
    statItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
});

export default LearnMain;
