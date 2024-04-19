"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { toFormikValidationSchema } from 'zod-formik-adapter'; // Assuming you're using Zod for validation
import { Formik } from 'formik';
import { toast } from '@/components/ui/use-toast';
import { clientApi } from '@/trpc/react';
import FormInput from '@/components/ui/ٌFormInput';
import { createUserSchema } from '@/schemas/auth.schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const initialForm = {
    email: '',
    username: '',
    password: '',
    password2: '',
}

const SignupPage = () => {
    const createUser = clientApi.users.createUser.useMutation()

    return (
        <main className='w-full min-h-screen flex justify-center items-center '>
            <Card className='w-full max-w-[450px]'>
                <CardHeader className='py-4'>
                    <CardTitle>
                        Sign up
                    </CardTitle>
                </CardHeader>
                <CardContent>

                    <Formik
                        initialValues={initialForm}
                        validationSchema={toFormikValidationSchema(createUserSchema)}
                        onSubmit={async (values, actions) => {
                            try {
                                await createUser.mutate({
                                    email: values.email,
                                    password: values.password,
                                    password2: values.password2,
                                    username: values.username
                                },
                                    {
                                        onSuccess: () => {
                                            toast({
                                                title: "registred",
                                                description: "please check your email to verify your account"
                                            })
                                            // router.push('/auth/signin');
                                        },
                                        onError: (err) => {
                                            console.log('--------errror --------')
                                            const error = err.data?.errors
                                            console.log(error)
                                            console.log('--------errror --------')
                                            //@ts-ignore
                                            actions.setErrors()
                                        }
                                    }
                                )
                            } catch (error) {
                                // Handle error
                                console.error('Signup failed:', error);
                            }
                        }}
                    >
                        {(props) => (
                            <form onSubmit={props.handleSubmit} >

                                <div className="flex flex-col space-y-4">

                                    <FormInput name='email' type='text' label="Email" />
                                    <FormInput name='username' type='text' label='Username' />
                                    <FormInput name='password' type='password' label='Password' />
                                    <FormInput name='password2' type='password' label='Password confirmation' />

                                    <Button disabled={props.isSubmitting} className='mt-2' type='submit'>Sign up</Button>
                                </div>
                                {/* You can handle and display errors here */}
                            </form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </main>
    );
};

export default SignupPage;
