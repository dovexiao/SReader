import React, { useRef, useState } from'react';
import {
    StyleSheet,
    View,
    Text,
    SectionList,
    TouchableOpacity,
    Dimensions,
    Platform,
    Animated,
    Easing,
    SectionBase, SectionListData, Image,
} from 'react-native';
import getItemLayout from 'react-native-get-item-layout-section-list';
import {useTheme} from '@ui-kitten/components';
import RandomAvatar from "../../components/mainComponents/RandomAvatar.tsx";

const { width, height } = Dimensions.get('window');
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
const ITEM_HEIGHT = 80;
const HEADER_HEIGHT: number = 40;

const buildGetItemLayout = getItemLayout({
    getItemHeight: ITEM_HEIGHT,
    getSectionHeaderHeight: HEADER_HEIGHT,
});

// 定义联系人项的类型
type ContactItem = {
    id: string;
    name: string;
    avatar: string;
    phone: string;
};

// 定义分组的类型
type Section = SectionBase<ContactItem> & {
    title: string;
    data: ContactItem[];
};

// 生成示例数据
const generateData = (): Section[] => {
    const sections: Section[] = [];

    ALPHABET.forEach(letter => {
        const items: ContactItem[] = [];
        const itemCount = Math.floor(Math.random() * 5); // 每个字母3-7个项目
        // const itemCount: number = 3;

        for (let i = 1; i <= itemCount; i++) {
            items.push({
                id: `${letter}${i}`,
                name: `${letter}联系人 ${i}`,
                avatar: '',
                phone: `1${Math.floor(Math.random() * 1000000000).toString().padStart(10, '0')}`
            });
        }

        if (items.length > 0) {
            sections.push({
                title: letter,
                data: items,
            });
        }
    });

    return sections;
};

interface FriendListProps {
    navigation: any;
}

const FriendList: React.FC<FriendListProps> = ({ navigation }) => {
    const sectionListRef = useRef<SectionList | null>(null);
    const [sections] = useState<Section[]>(generateData());
    const [activeLetter, setActiveLetter] = useState<string | null>(null);
    // const [sectionOffsets, setSectionOffsets] = useState<{ [key: string]: number }>({});
    const [showLetterPopup, setShowLetterPopup] = useState(false);
    const [popupLetter, setPopupLetter] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const themes  = useTheme();

    // 处理字母导航点击
    const handleLetterPress = (letter: string) => {
        const sectionIndex = sections.findIndex(s => s.title === letter);

        if (sectionIndex !== -1 && sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
                sectionIndex,
                itemIndex: 1,
                viewOffset: 0,
                animated: true,
                viewPosition: 0,
            });

            // 显示字母提示
            setPopupLetter(letter);
            setShowLetterPopup(true);
            // setActiveLetter(letter);

            // 动画效果
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 100,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    delay: 300,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ]).start(() => setShowLetterPopup(false));
        }
    };

    // 记录每个分组的偏移位置
    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: any[] }) => {
        if (viewableItems.length > 0) {
            const firstItem = viewableItems[0];
            // console.log(viewableItems);
            if (firstItem.section) {
                setActiveLetter(firstItem.section.title);
                // console.log(firstItem.section.title);
            }
        }
    };

    // 渲染列表项
    const renderItem = ({ item }: { item: ContactItem }) => (
        <View style={styles.itemContainer}>
            {item.avatar ?
                <Image
                    source={{ uri: item.avatar }}
                    style={styles.avatar}
                /> :
                <RandomAvatar size={50}/>
            }
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.phone}>{item.phone}</Text>
            </View>
            <TouchableOpacity style={styles.callButton}>
                {/*<Text style={styles.callIcon}>📞</Text>*/}
            </TouchableOpacity>
        </View>
    );

    // 渲染分组标题
    const renderSectionHeader = ({ section }: { section: SectionListData<ContactItem> }) => (
        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionHeaderText, { color: themes['color-primary-500'] }]}>{section.title}</Text>
        </View>
    );

    // 渲染字母导航栏
    const renderAlphabetNavigator = () => (
        <View style={styles.alphabetContainer}>
            {ALPHABET.map(letter => {
                const isActive = letter === activeLetter;
                const hasData = sections.some(s => s.title === letter);

                return (
                    <TouchableOpacity
                        key={letter}
                        onPress={() => handleLetterPress(letter)}
                        disabled={!hasData}
                        style={styles.letterButton}
                    >
                        <Text style={[
                            styles.letterText,
                            isActive && [styles.activeLetter, { color: themes['color-primary-500'] }],
                            !hasData && styles.disabledLetter,
                        ]}>
                            {letter}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );

    return (
        <View style={styles.container}>
            {/*<View style={styles.header}>*/}
            {/*    <Text style={styles.headerTitle}>联系人列表</Text>*/}
            {/*    <Text style={styles.headerSubtitle}>{sections.reduce((count, section) => count + section.data.length, 0)} 个联系人</Text>*/}
            {/*</View>*/}

            <SectionList
                ref={sectionListRef}
                sections={sections}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                stickySectionHeadersEnabled
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
                contentContainerStyle={styles.listContent}
                getItemLayout={buildGetItemLayout}
            />

            {renderAlphabetNavigator()}

            {showLetterPopup && (
                <Animated.View style={[styles.letterPopup, { opacity: fadeAnim }]}>
                    <Text style={styles.popupText}>{popupLetter}</Text>
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
    },
    listContent: {
        paddingBottom: 30,
    },
    itemContainer: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 16,
        paddingHorizontal: 15,
        // marginHorizontal: 15,
        // marginVertical: 10,
        // borderRadius: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#5e8d93',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textContainer: {
        flex: 1,
        marginLeft: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    phone: {
        fontSize: 14,
        color: '#777',
        marginTop: 3,
    },
    callButton: {
        padding: 10,
    },
    callIcon: {
        fontSize: 24,
    },
    sectionHeader: {
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        // paddingVertical: 8,
        paddingHorizontal: 20,
        // borderBottomWidth: 1,
        // borderBottomColor: '#e0e0e0',
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5e8d93',
    },
    alphabetContainer: {
        position: 'absolute',
        right: 10,
        top: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 15,
    },
    letterButton: {
        paddingVertical: 1,
        paddingHorizontal: 5,
    },
    letterText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#999',
    },
    activeLetter: {
        // color: '#5e8d93',
        fontSize: 14,
    },
    disabledLetter: {
        color: '#ddd',
    },
    letterPopup: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(240, 144, 80, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        top: height / 4,
        zIndex: 100,
    },
    popupText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default FriendList;
