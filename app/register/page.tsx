"use client"
import React, { useState } from 'react';

// Add this line at the top of your file
export default function RegisterComponent() {
  // Rest of your component code using useState
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role, phone_number }),
      });
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      const data = await response.json();
      console.log('Registration successful:', data); // Handle registration data (e.g., display success message)
    } catch (error) {
      console.error(error); // Handle registration errors
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
          <div className="flex items-center justify-between">
          <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
        </div></div>
        
         <div className="flex items-center justify-between">
          <label className="block text-sm font-medium leading-6 text-gray-900">Phone Number:</label>
          <div className="flex items-center justify-between">
          <input type="number" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={phone_number} onChange={(e) => setPhone(e.target.value)} /></div>
        </div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
          <div className="flex items-center justify-between">
          <input type="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
        </div>
        <div className="text-sm">
          <label className="font-semibold text-indigo-600 hover:text-indigo-500">Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="worker">Worker</option>
          </select>
        </div>
        <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">Register</button>
      </form>
      </div>
    </div>
  );
};

