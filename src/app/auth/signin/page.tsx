"use client";

import { signIn } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Formik } from "formik"
import { Button } from '@/components/ui/button';
import FormInput from '@/components/ui/ٌFormInput';
import { toFormikValidationSchema } from "zod-formik-adapter"
import { SigninSchema } from '@/server/auth';
const initialForm = {
    email: "",
    password: "",
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
            <Card className='w-full max-w-[400px]'>
                <CardHeader>
                    <CardTitle>Login now</CardTitle>
                </CardHeader>
                <CardContent>
                    <Formik
                        initialValues={initialForm}
                        validationSchema={toFormikValidationSchema(SigninSchema)}
                        onSubmit={(values, actions) => {
                            console.log(values)
                        }}
                    >


                        {(props) => (

                            <form onSubmit={props.handleSubmit} className=''>
                                <div className="flex flex-col space-y-4">
                                    <FormInput />
                                    <FormInput />
                                    <Button type='submit'>Sign in</Button>
                                </div>
                                {props.touched && !props.isValid &&
                                    <div>
                                        <span className=''>please check your inputs</span>
                                    </div>
                                }
                            </form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </main>
    );
};

export default SigninPage;
