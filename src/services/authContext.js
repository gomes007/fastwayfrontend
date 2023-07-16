import React, { createContext, useState, useEffect } from "react";
import AuthService from "@/services/authService";

const AuthContext = createContext({
    isLoggedIn: false,
    user: null,
});

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setIsLoggedIn(user !== null);
        setUser(user);
    }, []);

    return {
        isLoggedIn,
        user,
    };
};

export default AuthContext;
