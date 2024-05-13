// En src/contexts/NavigationContext.js
import React, { createContext, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const navigate = useNavigate();

    const goTo = useCallback((path) => {
        navigate(path);
    }, [navigate]);

    return (
        <NavigationContext.Provider value={{ goTo }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => useContext(NavigationContext);
