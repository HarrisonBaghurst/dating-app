'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type RefreshEventsProviderType = {
    refresh: () => void;
    trigger: number;
};

const RefreshEventsContext = createContext<RefreshEventsProviderType | undefined>(undefined);

export const RefreshEventsProvider = ({ children }: { children: ReactNode }) => {
    const [trigger, setTrigger]  = useState(0);

    const refresh = useCallback(() => {
        setTrigger((t) => t + 1);
    }, []);

    return (
        <RefreshEventsContext.Provider value={{ refresh, trigger }}>
            {children}
        </RefreshEventsContext.Provider>
    )
}

export const useRefreshEventsContext = () => {
    const ctx = useContext(RefreshEventsContext);
    if (!ctx) throw new Error('useRefreshEventsContext must be used within RefreshEventsProvider');
    return ctx;
}