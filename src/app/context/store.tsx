'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

type DataType = {
    firstName: string;
};

interface ContextProps {
    userId: string;
    setUserId: Dispatch<SetStateAction<string>>;
    data: DataType[];
    setData: Dispatch<SetStateAction<DataType[]>>;
}

const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: () => {},
    data: [],
    setData: () => {},
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState<string>('');
    const [data, setData] = useState<DataType[]>([]);

    // Provide the context value as an object containing userId, setUserId, data, and setData
    const contextValue = {
        userId,
        setUserId,
        data,
        setData,
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
