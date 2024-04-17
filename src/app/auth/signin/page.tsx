"use client";
import { signIn } from 'next-auth/react';
import React, { ChangeEvent, FormEvent, useState } from 'react';
const initialForm = {
    email: '',
    password: ""
}
const SigninPage = () => {
    const [form, setForm] = useState(initialForm)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...form, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            password: form["password"],
            email: form["email"],
        });

        if (result && !result.error) {
            // Redirect user to dashboard or any other page
            // Example: router.push('/dashboard');
            window.alert('Sign in successful!');
        } else {
            window.alert(result?.ok);
        }
    };

    return (
        <main className='w-full min-h-screen flex justify-center items-center '>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-[350px]'>
                <div className='w-full'>
                    <input
                        type="text"
                        value={form["email"]}
                        placeholder='jhon@email.com'
                        name="email"
                        onChange={handleChange}

                        className='bg-gray-100  w-full py-3 px-2 rounded-md'
                    />
                </div>
                <div className='w-full'>
                    <input
                        type="password"
                        value={form["password"]}
                        placeholder='password'
                        name="password"
                        onChange={handleChange}
                        className='bg-gray-50 w-full py-2 px-2 rounded-md'
                    />
                </div>
                <button type="submit" className='mt-4 bg-blue-400 text-white  rounded-md  py-2'>Sign In</button>
            </form>
        </main>
    );
};

export default SigninPage;
