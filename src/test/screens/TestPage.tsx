import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Animated,
    ScrollView,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// 模拟笔记数据
const mockNotes = Array.from({ length: 10 }, (_, i) => ({
    id: `note-${i + 1}`,
    title: `笔记标题 ${i + 1}`,
    content: `这是第 ${i + 1} 个笔记的内容。这里展示了笔记的主要信息和预览文本。笔记内容可以包含各种信息，如学习笔记、会议记录或创意想法。`,
    tags: [`标签${i + 1}`, `分类${(i % 3) + 1}`],
    createdAt: new Date(Date.now() - i * 24 * 3600 * 1000).toISOString(),
    lastModified: new Date().toISOString(),
}));

const NotePagerContainer = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const handleMomentumScrollEnd = (e: any) => {
        const offsetX = e.nativeEvent.contentOffset.x;
        const newPage = Math.round(offsetX / screenWidth);
        setCurrentPage(newPage);
    };

    const scrollToPage = (page: number) => {
        if (page >= 0 && page < mockNotes.length) {
            flatListRef.current?.scrollToIndex({ index: page, animated: true });
            setCurrentPage(page);
        }
    };

    const renderNoteItem = ({ item, index }: { item: any; index: number }) => (
        <ScrollView>
            <View style={styles.noteContainer}>
                <View style={styles.noteHeader}>
                    <Text style={styles.noteTitle}>{item.title}</Text>
                    <Text style={styles.noteDate}>创建于: {new Date(item.createdAt).toLocaleDateString()}</Text>
                </View>

                <View style={styles.noteContent}>
                    <Text style={styles.noteText}>{item.content}</Text>
                </View>

                <View style={styles.tagsContainer}>
                    {item.tags.map((tag: string, tagIndex: number) => (
                        <View key={tagIndex} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.pageIndicator}>第 {index + 1} 页 / 共 {mockNotes.length} 页</Text>
            </View>
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>笔记浏览</Text>
                <Text style={styles.subtitle}>左右滑动浏览笔记内容</Text>
            </View>

            <View style={styles.pagerContainer}>
                <FlatList
                    ref={flatListRef}
                    data={mockNotes}
                    renderItem={renderNoteItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    onMomentumScrollEnd={handleMomentumScrollEnd}
                    scrollEventThrottle={16}
                />
            </View>

            <View style={styles.controls}>
                <TouchableOpacity
                    style={[styles.controlButton, currentPage === 0 && styles.disabledButton]}
                    onPress={() => scrollToPage(currentPage - 1)}
                    // disabled={currentPage === 0}
                >
                    <Text style={styles.controlText}>上一页</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.controlButton, currentPage === mockNotes.length - 1 && styles.disabledButton]}
                    onPress={() => scrollToPage(currentPage + 1)}
                    // disabled={currentPage === mockNotes.length - 1}
                >
                    <Text style={styles.controlText}>下一页</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.pageIndicatorContainer}>
                {mockNotes.map((_, index) => {
                    const opacity = scrollX.interpolate({
                        inputRange: [
                            (index - 1) * screenWidth,
                            index * screenWidth,
                            (index + 1) * screenWidth,
                        ],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[styles.dot, { opacity }]}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
        padding: 16,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    subtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        marginTop: 5,
    },
    pagerContainer: {
        height: 400,
        borderRadius: 16,
        overflow: 'hidden',
        // elevation: 8,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.1,
        // shadowRadius: 8,
        backgroundColor: 'blue',
    },
    noteContainer: {
        flex: 1,
        width: screenWidth - 32,
        // backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        // marginHorizontal: 16,
        justifyContent: 'space-between',
        backgroundColor: 'red',
    },
    noteHeader: {
        marginBottom: 16,
    },
    noteTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2980b9',
        marginBottom: 8,
    },
    noteDate: {
        fontSize: 14,
        color: '#95a5a6',
    },
    noteContent: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 16,
    },
    noteText: {
        fontSize: 18,
        lineHeight: 28,
        color: '#34495e',
    },
    tagsContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 24,
    },
    tag: {
        backgroundColor: '#e1f0fa',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 14,
        marginRight: 10,
    },
    tagText: {
        fontSize: 14,
        color: '#3498db',
        fontWeight: '500',
    },
    pageIndicator: {
        textAlign: 'center',
        fontSize: 16,
        color: '#7f8c8d',
        marginTop: 10,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        paddingHorizontal: 20,
    },
    controlButton: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
        elevation: 3,
    },
    disabledButton: {
        backgroundColor: '#bdc3c7',
    },
    controlText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pageIndicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#3498db',
        marginHorizontal: 5,
    },
});

export default NotePagerContainer;
