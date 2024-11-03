"use client"

import {User} from "@/lib/models/User";
import React, {createContext, ReactNode, useEffect, useState} from "react";
import {HttpServices} from "@/lib/HttpServices";

interface AuthContextType {
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const httpServices = new HttpServices();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            setToken(storedToken);
            setLoading(false);
        } else {
            localStorage.removeItem("token");
            setLoading(false);
        }
    }, []);

    const login = (newToken: string, user: User) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    }
    
    const value = {
        token,
        login,
        logout
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() : AuthContextType{
    const context = React.useContext(AuthContext);
    
    if (context === undefined){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    
    return context;
}