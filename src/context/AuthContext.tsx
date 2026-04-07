/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { tokenStorage } from "../utils/tokenStorage";

type AuthContextType = {
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children} : {children: React.ReactNode }) {
    const [isAuthenticated] = useState(() => {
        const token = tokenStorage.getToken()
        return Boolean(token)
    });
    const [isLoading] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within AuthProvider")
    return ctx
}