"use client";
import { signIn } from 'next-auth/react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Formik } from "formik"
import { Button } from '@/components/ui/button';
import FormInput from '@/components/ui/ٌFormInput';
import { toFormikValidationSchema } from "zod-formik-adapter"
import { SigninSchema } from '@/server/auth';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
const initialForm = {
    email: "",
    password: "",
}
const SigninPage = () => {
    const { toast } = useToast()
    const router = useRouter()

    return (
        <main className='w-full min-h-screen flex justify-center items-center '>
            <Card className='w-full max-w-[450px]'>
                <CardHeader>
                    <CardTitle> Login </CardTitle>
                </CardHeader>
                <CardContent>
                    <Formik
                        initialValues={initialForm}
                        validationSchema={toFormikValidationSchema(SigninSchema)}
                        onSubmit={async (values, actions) => {

                            const result = await signIn('credentials', {
                                redirect: false,
                                email: values.email,
                                password: values.password,
                            });
                            if (!result?.ok) {
                                actions.setErrors({ email: "Invalid", password: "Invalid" })
                                toast({
                                    title: "failed",
                                    variant: "destructive"

                                })
                                actions.setSubmitting(false)
                            }
                            else {
                                toast({
                                    title: "success",
                                    variant: "success"

                                })
                                router.push("/")
                            }
                        }}
                    >


                        {(props) => (

                            <form onSubmit={props.handleSubmit} className=''>
                                <div className="flex flex-col space-y-4">
                                    <FormInput name='email' type='email' label='Email' />
                                    <FormInput name='password' type='password' label='Password' />
                                    <div className=" text-sm flex justify-end py-2">
                                        <Link href="/auth/account/reset" className='hover:text-primary hover:shadow-sm'>forgot your password</Link>
                                    </div>
                                    <Button disabled={props.isSubmitting} className='mt-2' type='submit'>Sign in</Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </CardContent>
                <CardFooter>
                    <div className='w-full flex flex-col gap-2'>
                        <Button className='relative ' variant={"ghost"}>
                            <span className='hidden md:block'>Sign in with </span>
                            <span> &nbsp; Google</span>
                            <Image className='absolute top-1/2 -translate-y-1/2 left-1/4' src="/social-media/google.png" width={21} height={21} alt="google icon" />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </main>
    );
};

export default SigninPage;
