import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import React from 'react'

const VerifyEmailPage = async () => {
    const session = await getServerAuthSession()
    if (!session)
        redirect("/auth/signin")
    if (session.user.verified)
        redirect("/")

    return (
        <main className='min-h-screen flex justify-center items-center'>
            <div>
                hello {session?.user.username} please verify your {session?.user.email}  email
            </div>
        </main>
    )
}

export default VerifyEmailPage;