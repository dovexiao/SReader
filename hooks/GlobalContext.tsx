import React, { useRef } from 'react';
import SliderVerification from '../components/Global/SliderVerification.tsx';

interface GlobalContextType {
    sliderVerificationRef: React.MutableRefObject<any>;
}

const GlobalContext = React.createContext<GlobalContextType | null>(null);

export const GlobalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const sliderVerificationRef = useRef<any>(null);

    const globalValue: GlobalContextType = {
        sliderVerificationRef,
    };

    return (
        <GlobalContext.Provider value={globalValue}>
            {children}
            <SliderVerification ref={sliderVerificationRef}/>
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
