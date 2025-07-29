import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Note } from '../../../stores/note.store.ts';
import { getTagColor } from '../../../utils/getTagColor.ts';

type RootStackParamList = {
    NoteDetail: { id: string };
    // 其他页面也可以在这里添加
}

interface NoteCardProps {
    note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <Pressable onPress={() => navigation.navigate('NoteDetail', { id: note.noteId })}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.cardId}>{note.noteId}</Text>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{note.title}</Text>
                </View>

                <Text style={styles.introduce} numberOfLines={2} ellipsizeMode={'tail'}>{note.introduce}</Text>

                <View style={styles.tagsContainer}>
                    {note.tags.map((tag, index) => (
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

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
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
        marginBottom: 8,
    },
    cardId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginRight: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555555',
        marginBottom: 8,
    },
    introduce: {
        fontSize: 14,
        color: '#444444',
        marginBottom: 12,
        lineHeight: 20,
        backgroundColor: '#F5F7FA',
        padding: 16,
        borderRadius: 8,
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

export default NoteCard;
