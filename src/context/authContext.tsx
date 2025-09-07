'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Định nghĩa các loại trạng thái xác thực và người dùng
interface AuthState {
    isAuthenticated: boolean;
    user: { name: string; email: string } | null;
    showModal: 'signin' | 'signup' | null;
    toggleModal: (type: 'signin' | 'signup' | null) => void;
    signIn: (user: { name: string; email: string }) => void;
    signOut: () => void;
}

// Tạo Context để quản lý trạng thái xác thực
const AuthContext = createContext<AuthState | undefined>(undefined);

// Provider để cung cấp trạng thái xác thực cho toàn bộ ứng dụng
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [showModal, setShowModal] = useState<'signin' | 'signup' | null>('signin');

    const toggleModal = (type: 'signin' | 'signup' | null) => setShowModal(type);

    const signIn = (userData: { name: string; email: string }) => {
        setIsAuthenticated(true);
        setUser(userData);
        setShowModal(null);
    };

    const signOut = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    const value = { isAuthenticated, user, showModal, toggleModal, signIn, signOut };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook để sử dụng trạng thái xác thực
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
