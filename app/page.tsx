// pages/index.tsx
'use client'
import { useAuth } from './context/auth';

export default function Home() {
    const { user, logout, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>Please login to access this page.</div>;

    return (
        <div>
            <h1>Welcome {user.email}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}