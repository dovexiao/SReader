import React, { createContext, useContext, useRef } from 'react';
import { Text } from 'react-native';
import { TabPagerContainer, TabPagerContainerAPI } from '@/center/recycleBin/components/TabPagerContainer.tsx';
import { TabBarContainer } from '@/center/recycleBin/components/TabBarContainer.tsx';
import { Tab } from '@/center/recycleBin/types';
import {FriendList} from "@/center/recycleBin/components";

const tabs: Tab[] = [
    { icon: 'file-text-outline', label: '笔记' },
    { icon: 'book-open-outline', label: '题目' },
];

interface TabContextType {
    goSelectedPage: (index: number) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{}> = () => {
    const containerRef = useRef<TabPagerContainerAPI>(null);

    const goSelectedPage = (index: number) => {
        containerRef.current?.scrollToPage(index);
    };

    const contextValue: TabContextType = {
        goSelectedPage
    };

    return (
        <TabContext.Provider value={contextValue}>
            <TabBarContainer tabs={tabs} />
            <TabPagerContainer ref={containerRef} >
                <FriendList />
                <Text>313</Text>
            </TabPagerContainer>
        </TabContext.Provider>
    );
};

export const useTabContext = () => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error('useTabContext must be used within a TabProvider');
    }
    return context;
};
