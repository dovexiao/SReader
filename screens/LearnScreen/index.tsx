import React from'react';
import { useTheme } from '@ui-kitten/components';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    ScrollView,
} from'react-native';
import LearnBoxes from "../../components/Learn/LearnMain/LearnBoxes.tsx";
import { NavigationProps } from "../../types/navigationType.ts";

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

const LearnMain: React.FC<NavigationProps> = ({ navigation }) => {
    const themes = useTheme();

    // const recentActivities: RecentActivity[] = [
    //     {
    //         id: '1',
    //         type: '浏览',
    //         entityTitle: 'JavaScript Fundamentals',
    //         entityType: '笔记',
    //         time: 'Today',
    //         icon: 'eye-outline',
    //         dotColor: '#E55A2B',
    //     },
    //     {
    //         id: '3',
    //         type: '新增',
    //         entityTitle: 'System Design',
    //         entityType: '录音',
    //         time: 'Today',
    //         icon: 'plus-outline',
    //         dotColor: '#4CAF50',
    //     },
    //     {
    //         id: '4',
    //         type: '编辑',
    //         entityTitle: 'React Hooks Guide',
    //         entityType: '题目',
    //         time: 'Today',
    //         icon: 'edit-2-outline',
    //         dotColor: '#4F7CFF',
    //     },
    // ];

    // const renderActivity = (item: RecentActivity, index: number) => (
    //     <TouchableOpacity
    //         style={styles.activityItem}
    //         key={item.id || `activity-${index}`}
    //     >
    //         <View style={styles.activityIcon}>
    //             <Icon
    //                 name={item.icon}
    //                 fill={item.dotColor}
    //                 width={18} height={18}
    //             />
    //         </View>
    //         <View style={styles.activityContent}>
    //             <Text style={styles.activityType}>{item.type}</Text>
    //             <Text style={styles.activityTitle}>{item.entityTitle}</Text>
    //             <Text style={styles.activityTime}>{item.time}</Text>
    //         </View>
    //         <View style={styles.activityRight}>
    //             <View style={[styles.activityDot, { backgroundColor: item.dotColor }]} />
    //             <Icon
    //                 name="chevron-right-outline"
    //                 fill={item.dotColor}
    //                 width={16} height={16}
    //             />
    //         </View>
    //     </TouchableOpacity>
    // );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <ScrollView>
                <LearnBoxes navigation={navigation} />

                {/*<View style={styles.recentSection}>*/}
                {/*    <View style={styles.recentHeader}>*/}
                {/*        <View style={styles.recentTitleContainer}>*/}
                {/*            <Text style={styles.recentTitle}>最近操作</Text>*/}
                {/*        </View>*/}
                {/*        <TouchableOpacity>*/}
                {/*            <Text style={[styles.viewAllText, { color: themes['color-primary-500'] }]}>详情</Text>*/}
                {/*        </TouchableOpacity>*/}
                {/*    </View>*/}

                {/*    <View style={styles.bottomStats}>*/}
                {/*        <View style={styles.statItem}>*/}
                {/*            <Text style={styles.statNumber}>7</Text>*/}
                {/*            <Text style={styles.statLabel}>笔记</Text>*/}
                {/*        </View>*/}
                {/*        <View style={styles.statItem}>*/}
                {/*            <Text style={styles.statNumber}>48</Text>*/}
                {/*            <Text style={styles.statLabel}>题目</Text>*/}
                {/*        </View>*/}
                {/*        <View style={styles.statItem}>*/}
                {/*            <Text style={styles.statNumber}>6</Text>*/}
                {/*            <Text style={styles.statLabel}>录音</Text>*/}
                {/*        </View>*/}
                {/*    </View>*/}

                {/*    <View style={styles.activitiesList}>*/}
                {/*        {recentActivities.map((item, index) => renderActivity(item, index))}*/}
                {/*    </View>*/}
                {/*</View>*/}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    // recentSection: {
    //     flex: 1,
    //     backgroundColor: '#FFFFFF',
    //     marginTop: 10,
    //     paddingVertical: 20,
    // },
    // recentHeader: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     paddingHorizontal: 20,
    //     marginBottom: 16,
    // },
    // recentTitleContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // recentTitle: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     color: '#333',
    //     marginLeft: 8,
    // },
    // viewAllText: {
    //     fontSize: 14,
    //     color: '#4F7CFF',
    //     fontWeight: '600',
    // },
    // activitiesList: {
    //     flex: 1,
    // },
    // activityItem: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     paddingHorizontal: 20,
    //     paddingVertical: 12,
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#F5F5F5',
    // },
    // activityIcon: {
    //     width: 40,
    //     height: 40,
    //     borderRadius: 20,
    //     backgroundColor: '#f3f4f6',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginRight: 12,
    // },
    // activityContent: {
    //     flex: 1,
    // },
    // activityType: {
    //     fontSize: 16,
    //     color: '#333',
    //     fontWeight: 'bold',
    // },
    // activityTitle: {
    //     fontSize: 14,
    //     color: '#666',
    //     marginTop: 2,
    // },
    // activityTime: {
    //     fontSize: 12,
    //     color: '#999',
    //     marginTop: 2,
    // },
    // activityRight: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // activityDot: {
    //     width: 8,
    //     height: 8,
    //     borderRadius: 4,
    //     marginRight: 8,
    // },
    // bottomStats: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-around',
    //     alignItems: 'center',
    //     backgroundColor: '#FFFFFF',
    //     paddingVertical: 20,
    // },
    // statItem: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // statNumber: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     color: '#333',
    // },
    // statLabel: {
    //     fontSize: 12,
    //     color: '#999',
    //     marginTop: 4,
    // },
});

export default LearnMain;
