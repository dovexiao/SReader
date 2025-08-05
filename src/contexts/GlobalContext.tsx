import React, { useRef } from 'react';
import {
    AvatarActionsModal,
    PersonCenter,
    SliderVerification,
} from '@/global';
import type {
    AvatarActionsModalAPI,
    PersonCenterAPI,
    SliderVerificationAPI,
} from '@/global';

interface GlobalContextType {
    sliderVerificationRef: React.RefObject<SliderVerificationAPI>,
    PersonCenterRef: React.RefObject<PersonCenterAPI>,
    AvatarActionsModalRef: React.RefObject<AvatarActionsModalAPI>,
}

const GlobalContext = React.createContext<GlobalContextType | null>(null);

export const GlobalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const sliderVerificationRef = useRef<SliderVerificationAPI>(null);
    const PersonCenterRef = useRef<PersonCenterAPI>(null);
    const AvatarActionsModalRef = useRef<AvatarActionsModalAPI>(null);

    const globalValue: GlobalContextType = {
        sliderVerificationRef,
        PersonCenterRef,
        AvatarActionsModalRef,
    };

    return (
        <GlobalContext.Provider value={globalValue}>
            {children}
            <SliderVerification ref={sliderVerificationRef} />
            <PersonCenter ref={PersonCenterRef} />
            <AvatarActionsModal ref={AvatarActionsModalRef}/>
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => {
    const context = React.useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobal must be used within an GlobalProvider');
    }
    return context;
};
