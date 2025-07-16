import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { NavigationProps } from '../../types/navigationType.ts';
import { Icon } from '@ui-kitten/components';
import RandomAvatar from '../../components/Main/RandomAvatar.tsx';
import LinearGradient from 'react-native-linear-gradient';

const SocializeMain: React.FC<NavigationProps> = ({ navigation }) => {
    const [isFilled, setIsFilled] = useState(false);
    const [selectedType, setSelectedType] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('Programming');
    // const [searchText, setSearchText] = useState('');

    const typeFilters = ['全部', '笔记', '题目', '录音', '帖子'];
    const categoryFilters = ['全部', '编程', '科学', '艺术'];
    const knowledgeFilters = ['编程', '科学', '数学', '历史', '哲学', '心理学', '经济', '文学'];
    const entertainmentFilters = ['音乐', '影视', '游戏', '体育', '喜剧', '艺术', '摄影', '跳舞'];
    const lifestyleFilters = ['健康', '健身', '烹饪', '旅游', '时尚', '家庭'];

    const recommendedCourses = [
        {
            id: '1',
            title: 'JavaScript Fundamentals',
            author: '',
            description: 'Master the basics of JavaScript programming',
            rating: 4.8,
            students: '12.5K',
            duration: 'Today',
            category: 'Programming',
            type: '笔记',
            image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=240&fit=crop',
        },
        {
            id: '2',
            title: 'Data Science with Python',
            author: '',
            description: 'Comprehensive guide to data analysis and machine learning',
            rating: 4.8,
            students: '15.3K',
            duration: 'Today',
            category: 'Science',
            type: '帖子',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop',
        },
        {
            id: '3',
            title: 'React Advanced Patterns',
            author: '',
            description: 'Master advanced React development techniques',
            rating: 4.9,
            students: '9.1K',
            duration: 'Today',
            category: 'Programming',
            type: '题目',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=240&fit=crop',
        },
        {
            id: '4',
            title: 'UI/UX Design Principles',
            author: '',
            description: 'Learn modern design principles and best practices',
            rating: 4.9,
            students: '8.2K',
            duration: 'Today',
            category: 'Art',
            type: '录音',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop',
        },
    ];

    const renderFilterButton = (title, isSelected, onPress, showPlus = false) => (
        <TouchableOpacity
            key={title}
            style={[
                styles.filterButton,
                isSelected && styles.selectedFilterButton,
                isSelected && title === 'Programming' && styles.programmingSelected,
                isSelected && title === 'Science' && styles.scienceSelected,
                isSelected && title === 'Art' && styles.artSelected,
            ]}
            onPress={onPress}
        >
            <Text style={[
                styles.filterButtonText,
                isSelected && styles.selectedFilterButtonText,
            ]}>
                {title}
            </Text>
            {showPlus && <View style={styles.plusIcon}><Text style={styles.plusText}>+</Text></View>}
        </TouchableOpacity>
    );

    const renderCourseCard = ({ item }) => (
        <TouchableOpacity style={styles.courseCard}>
            <View style={styles.courseImageContainer}>
                <Image source={{ uri: item.image }} style={styles.courseImage} />
                <View style={styles.courseTypeTag}>
                    {item.type === '笔记' && <Icon name="file-text-outline" fill="#666" width={12} height={12} />}
                    {item.type === '题目' && <Icon name="book-open-outline" fill="#666" width={12} height={12} />}
                    {item.type === '录音' && <Icon name="headphones-outline" fill="#666" width={12} height={12} />}
                    {item.type === '帖子' && <Icon name="image-outline" fill="#666" width={12} height={12} />}
                    <Text style={styles.courseTypeText}>{item.type}</Text>
                </View>
            </View>
            <View style={styles.courseContent}>
                <Text style={styles.courseTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.courseDescription} numberOfLines={1}>{item.description}</Text>
                <View style={styles.courseStats}>
                    <View style={styles.courseMeta}>
                        <View style={[
                            styles.categoryTag,
                            item.category === 'Programming' && styles.programmingTag,
                            item.category === 'Science' && styles.scienceTag,
                            item.category === 'Art' && styles.artTag,
                        ]}>
                            <Text style={[
                                styles.categoryTagText,
                                item.category === 'Programming' && styles.programmingTagText,
                                item.category === 'Science' && styles.scienceTagText,
                                item.category === 'Art' && styles.artTagText,
                            ]}>
                                {item.category}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        {item.author ?
                            <Image
                                source={{ uri: item.author }}
                                style={styles.author}
                            /> :
                            <RandomAvatar size={20}/>
                        }
                        {/*<Text style={styles.courseAuthor}>{item.author}</Text>*/}
                        <View style={styles.bottomRightContainer}>
                            <Icon name="star-outline" fill="#FFD700" width={12} height={12} />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                            {/*<Text style={styles.studentsText}>{item.students}</Text>*/}
                            <Text style={styles.durationText}>{item.duration}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/*<StatusBar barStyle="light-content" backgroundColor="#6BCF7F" />*/}

            <LinearGradient
                colors={['#6BCF7F', '#42A5F5']}
                style={styles.gradientBackground}
            >
                <View style={styles.header}>
                    {/*<View style={styles.searchContainer}>*/}
                    {/*    <TextInput*/}
                    {/*        style={styles.searchInput}*/}
                    {/*        placeholder="搜索学习资源"*/}
                    {/*        placeholderTextColor="#999"*/}
                    {/*        value={searchText}*/}
                    {/*        onChangeText={setSearchText}*/}
                    {/*    />*/}
                    {/*    <TouchableOpacity style={styles.historyButton}>*/}
                    {/*        <Text style={styles.historyText}>历史记录</Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}

                    <View style={styles.statsContainer}>
                        <Pressable style={styles.statsButton} onPress={() => setIsFilled(!isFilled)}>
                            <Icon
                                name="settings-outline"
                                fill="#FFFFFF"
                                width={20} height={20}
                            />
                            {/*<Settings color="#FFFFFF" size={20} />*/}
                            <Text style={styles.statsText}>筛选</Text>
                        </Pressable>
                        {/*<Text style={styles.resourceCount}>4个资源</Text>*/}
                    </View>
                </View>

                {isFilled && <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <View style={styles.filtersContainer}>
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>类型</Text>
                            <View style={styles.filterRow}>
                                {typeFilters.map(type =>
                                    renderFilterButton(
                                        type,
                                        selectedType === type,
                                        () => setSelectedType(type)
                                    )
                                )}
                            </View>
                        </View>

                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>分类</Text>
                            <View style={styles.filterRow}>
                                {categoryFilters.map(category =>
                                    renderFilterButton(
                                        category,
                                        selectedCategory === category,
                                        () => setSelectedCategory(category)
                                    )
                                )}
                            </View>
                        </View>

                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>知识</Text>
                            <View style={styles.filterRow}>
                                {knowledgeFilters.map((item, index) =>
                                    renderFilterButton(
                                        item,
                                        item === 'Mathematics' && index === 2,
                                        () => {
                                        },
                                        item === 'Mathematics'
                                    )
                                )}
                            </View>
                        </View>

                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>娱乐</Text>
                            <View style={styles.filterRow}>
                                {entertainmentFilters.map(item =>
                                    renderFilterButton(item, false, () => {
                                    })
                                )}
                            </View>
                        </View>

                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>生活</Text>
                            <View style={styles.filterRow}>
                                {lifestyleFilters.map(item =>
                                    renderFilterButton(item, false, () => {
                                    })
                                )}
                            </View>
                        </View>
                    </View>
                </ScrollView>}

                <View style={[styles.bottomSection, { display: !isFilled ? 'flex' : 'none' }]}>
                    <View style={styles.recommendedHeader}>
                        <View style={styles.recommendedTitle}>
                            <Icon
                                name="heart-outline"
                                fill="red"
                                width={20} height={20}
                            />
                            {/*<Text style={styles.heartIcon}>💖</Text>*/}
                            <Text style={styles.recommendedText}>推荐学习</Text>
                        </View>
                        {/*<TouchableOpacity>*/}
                        {/*    <Text style={styles.moreText}>更多 ›</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>

                    <FlatList
                        data={recommendedCourses}
                        renderItem={renderCourseCard}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        columnWrapperStyle={styles.courseRow}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.coursesList}
                    />

                    <TouchableOpacity style={styles.addButton}>
                        {/*<Plus color="#666" size={20} />*/}
                        <Text style={styles.addButtonText}>发帖</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    gradientBackground: {
        flex: 1,
        paddingTop: 10,
        // paddingBottom: 20,
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    searchInput: {
        flex: 1,
        height: 45,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 22,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#333',
        marginRight: 15,
    },
    historyButton: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
    },
    historyText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    statsText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 8,
    },
    resourceCount: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    filtersContainer: {
        // flex: 1,
        paddingHorizontal: 20,
        // maxHeight: 400,
    },
    filterSection: {
        marginBottom: 20,
    },
    filterSectionTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    filterRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedFilterButton: {
        backgroundColor: '#FFFFFF',
    },
    programmingSelected: {
        backgroundColor: '#E3F2FD',
    },
    scienceSelected: {
        backgroundColor: '#F3E5F5',
    },
    artSelected: {
        backgroundColor: '#FFF3E0',
    },
    filterButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    selectedFilterButtonText: {
        color: '#666',
    },
    plusIcon: {
        marginLeft: 4,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    bottomSection: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    recommendedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    recommendedTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    recommendedText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    moreText: {
        color: '#F09050',
        fontSize: 14,
        fontWeight: '500',
    },
    coursesList: {
        paddingBottom: 70,
    },
    courseRow: {
        justifyContent: 'space-between',
    },
    courseCard: {
        width: '47%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
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
    courseImageContainer: {
        position: 'relative',
    },
    courseImage: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: '#F0F0F0',
    },
    courseTypeTag: {
        position: 'absolute',
        top: 8,
        right: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    courseTypeText: {
        fontSize: 10,
        color: '#666',
        marginLeft: 4,
        fontWeight: '500',
    },
    courseContent: {
        padding: 12,
    },
    courseTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    courseDescription: {
        fontSize: 11,
        color: '#666',
        marginBottom: 12,
        lineHeight: 16,
    },
    courseStats: {
        gap: 8,
    },
    courseMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    categoryTag: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        marginRight: 8,
    },
    programmingTag: {
        backgroundColor: '#E3F2FD',
    },
    scienceTag: {
        backgroundColor: '#F3E5F5',
    },
    artTag: {
        backgroundColor: '#FFF3E0',
    },
    categoryTagText: {
        fontSize: 9,
        fontWeight: '600',
    },
    programmingTagText: {
        color: '#1976D2',
    },
    scienceTagText: {
        color: '#7B1FA2',
    },
    artTagText: {
        color: '#F57C00',
    },
    // courseAuthor: {
    //     fontSize: 10,
    //     color: '#999',
    //     flex: 1,
    // },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // gap: 4,
    },
    author: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    bottomRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    studentsText: {
        fontSize: 9,
        color: '#666',
    },
    durationText: {
        fontSize: 9,
        color: '#666',
    },
    addButton: {
        width: 100,
        position: 'absolute',
        bottom: 20,
        left: '50%',
        // alignSelf: 'center',
        transform: [{ translateX: -30 }],
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        // borderWidth: 1,
        // borderColor: '#E0E0E0',
    },
    addButtonText: {
        color: '#F09050',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 8,
    },
});

export default SocializeMain;
