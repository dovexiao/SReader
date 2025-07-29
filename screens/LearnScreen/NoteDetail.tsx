import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image, StatusBar,
} from 'react-native';
import { NavigationProps } from '../../types/navigationType.ts';
import { Button, Divider, TopNavigationAction } from '@ui-kitten/components';
import TopNavigationOpe from '../../components/Main/TopNavigationOpe.tsx';
import { EditIcon } from '../../components/Icon';
import { formatTime } from '../../utils/formatTime.ts';
import { getTagColor } from '../../utils/getTagColor.ts';
import { useNoteStore } from '../../stores/note.store.ts';
import { useOpeNoteStore } from '../../stores/opeNote.store.ts';
import Markdown from 'react-native-markdown-display';

const NoteDetail: React.FC<NavigationProps> = ({ navigation, route }) => {
    const noteId = route.params?.id;

    const note = useNoteStore(state => state.notes.filter(q => q.noteId === noteId)[0]);
    const initialize = useOpeNoteStore(state => state.initialize);

    const renderItemAccessory = () => {
        return (
            <TopNavigationAction
                icon={EditIcon}
                onPress={() => {
                    initialize(note);
                    navigation.navigate('EditNote');
                }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ height: StatusBar.currentHeight, backgroundColor: '#ffffff'}} />
            <TopNavigationOpe
                title={note.noteId + ' 笔记详情'}
                navigation={navigation}
                renderItemAccessory={renderItemAccessory}
            />
            <Divider />

            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    {/*<Text style={styles.cardId}>{note.noteId}</Text>*/}
                    <Text style={styles.title} ellipsizeMode={'tail'} numberOfLines={1}>{note.title}</Text>
                    <Text style={styles.introduction} ellipsizeMode={'tail'} numberOfLines={3}>{note.introduce}</Text>
                </View>

                <Text style={styles.creationInfo}>
                    {formatTime(note.createdAt, { format: 'datetime' })}
                </Text>

                <Divider style={{ marginBottom: 10 }} />

                {/*<View style={styles.contentContainer}>*/}
                {/*    <Text style={styles.contentText}>{note.content}</Text>*/}
                {/*</View>*/}

                <Markdown
                    style={markdownStyles}
                    rules={renderRules}
                >
                    {note.content.trim() || '暂无内容'}
                </Markdown>

                <Divider style={{ marginVertical: 10 }} />

                {note.tags.length > 0 && <View style={styles.tagsContainer}>
                    <Text style={styles.sectionTitle}>标签</Text>
                    <View style={styles.tagsList}>
                        {note.tags.map((tag: string, index: number) => (
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
                        最近修改: {formatTime(note.lastModified, { format: 'datetime' })}
                    </Text>
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
            <Divider />
            {/*<View style={styles.buttonContainer}>*/}
            {/*    <Button appearance="ghost" style={styles.button}>上一篇</Button>*/}
            {/*    <Button appearance="ghost" style={styles.button}>下一篇</Button>*/}
            {/*</View>*/}
        </SafeAreaView>
    );
};

const markdownStyles = StyleSheet.create({
    // 全局基础样式
    body: {
        fontSize: 16,
        lineHeight: 30,
        color: '#333',
        backgroundColor: '#fff',
        fontFamily: 'System',
    },

    // 标题优化
    heading1: {
        fontSize: 22,
        fontWeight: '800',
        // marginVertical: 10,
        color: '#1a1a1a',
        // borderBottomWidth: 1,
        // borderBottomColor: '#cbcbcb',
        // paddingBottom: 8,
    },
    heading2: {
        fontSize: 20,
        fontWeight: '800',
        marginVertical: 5,
        color: '#222',
    },
    heading3: {
        fontSize: 18,
        fontWeight: '800',
        marginVertical: 5,
        color: '#333',
    },

    // 段落与引用
    paragraph: {
        marginVertical: 5,
    },
    blockquote: {
        backgroundColor: '#f2f2f2',
        borderLeftWidth: 4,
        borderColor: '#CCC',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginVertical: 10,
        marginHorizontal: 8,
    },

    // 列表样式
    list_item: {
        flexDirection: 'row',
        marginVertical: 0,
    },
    bullet_list_icon: {
        marginRight: 10,
        fontSize: 16,
        color: '#222',
    },
    ordered_list_icon: {
        marginRight: 10,
        fontSize: 16,
        // fontWeight: 'bold',
        color: '#222',
    },

    // 代码块
    code_inline: {
        backgroundColor: '#f2f2f2',
        // color: '#ffffff',
        padding: 15,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#cccccc',
    },
    code_block: {
        backgroundColor: '#2d2d2d',
        color: '#ffffff',
        padding: 15,
        borderRadius: 6,
        marginVertical: 14,
    },
    fence: {
        backgroundColor: '#2d2d2d',
        color: '#ffffff',
        padding: 15,
        borderRadius: 6,
        marginVertical: 14,
    },

    // 链接与图片
    link: {
        color: '#2980b9',
        textDecorationLine: 'underline',
    },
    image: {
        resizeMode: 'contain',
        height: 200,
        marginVertical: 10,
        borderRadius: 4,
    },

    // 表格优化
    table: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginVertical: 12,
        marginHorizontal: 8,
    },
    th: {
        backgroundColor: '#f8f8f8',
        fontWeight: '700',
        padding: 10,
    },
    tr: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    td: {
        flex: 1,
        padding: 10,
    },
});

const renderRules = {
    image: (node: any, children: any, parent: any, styles:  any) => (
        <Image
            key={node.key}
            style={styles.image}
            source={{ uri: node.attributes.src }}
        />
    )
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'column',
        // justifyContent: 'center',
        // marginBottom: 8,
    },
    cardId: {
        fontSize: 18,
        fontWeight: 'bold',
        // marginRight: 16,
        color: '#333333',
        // marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        // color: '#555555',
        color: '#000000',
        marginBottom: 8,
    },
    introduction: {
        fontSize: 16,
        color: '#555555',
        marginBottom: 8,
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

export default NoteDetail;
