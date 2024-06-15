// context/auth.tsx
'use client'
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    error: string | null; // Add error state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Initialize error state
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/api/users/me', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                setUser(response.data);
            })
            .catch(() => {
                localStorage.removeItem('token');
                setUser(null);
            })
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/login', { email, password });
            localStorage.setItem('token', response.data.access_token);
            const userResponse = await axios.get('/api/users/me', {
                headers: { Authorization: `Bearer ${response.data.access_token}` },
            });
            setUser(userResponse.data);
            router.push('/page.tsx');
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.detail || 'An unexpected error occurred');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
