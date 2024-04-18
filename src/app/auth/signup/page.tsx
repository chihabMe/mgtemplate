"use client";
import { clientApi } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
    const createUser = clientApi.users.createUser.useMutation({
        onSuccess:()=>{
            // router.push("/auth/signin")
        }
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        createUser.mutate({ email, password, password2: password, username })
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
                        type="text"
                        value={username}
                        placeholder='Enter your username'
                        onChange={(e) => setUsername(e.target.value)}
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
                {createUser.isError && <div>
                    <p className="text-red-500">{createUser.error.message}</p>
                </div>
                }
            </form>
        </main>
    );
};

export default SignupPage;
