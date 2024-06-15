'use client'; // Marking this file as a Client Component

import { useState } from 'react';
import { useAuth } from '../context/auth';

type LoginResponse = {
    access_token: string;
    token_type: string;
};

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useAuth();
    

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await login(email, password);
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h1>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div  className="flex items-center justify-between">
                    
                    <label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                    <div className="flex items-center justify-between">
                    <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div></div>
                <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
                    <div className="flex items-center justify-between">
                    <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div></div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">Login</button>
            </form>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              forget the password ?{' '}
              <a href="/forget" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                click here
              </a>
            </p>
        </div>
    );
}
