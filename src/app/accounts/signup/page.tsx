"use client";
import React, { FormEvent, useState } from 'react';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/accounts/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Redirect user to dashboard or any other page after successful sign-up
                window.alert('Sign up successful!');
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Sign up failed');
            }
        } catch (err) {
            // setError(err.message);
        }
    };

    return (
        <main className='w-full min-h-screen flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-[350px]'>
                <div className='w-full'>
                    <input
                        type="text"
                        value={email}
                        placeholder='Enter your email'
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-gray-100 w-full py-3 px-2 rounded-md'
                    />
                </div>
                <div className='w-full'>
                    <input
                        type="password"
                        value={password}
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-gray-50 w-full py-2 px-2 rounded-md'
                    />
                </div>
                <button type="submit" className='mt-4 bg-blue-400 text-white rounded-md py-2'>Sign Up</button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </main>
    );
};

export default SignupPage;
