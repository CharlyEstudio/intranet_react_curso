import React, { useState, useEffect, createContext } from 'react';
import { getAccessToken, logout } from '../api/auth';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export default function AuthProvider(props) {
    const { children } = props;
    const [ user, setUser ] = useState({
        user: null,
        menu: [],
        isLoading: true
    });

    useEffect(() => {
        checkUserLogin(setUser);
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

function checkUserLogin(setUser) {
    const accesToken = getAccessToken();
    if (!accesToken) {
        logout();
        setUser({
            user: null,
            menu: [],
            isLoading: false
        });
    } else {
        const { usuario, menu } = jwtDecode(accesToken);
        setUser({
            user: usuario,
            menu: menu,
            isLoading: false
        });
    }
}