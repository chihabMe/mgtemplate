import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import React from 'react'

const VerifyEmailPage = async () => {
    const session = await getServerAuthSession()
    if (!session) {
        redirect("/auth/signin")
    }
    return (
        <main> hello {session?.user.username} please verify your {session?.user.email}  email</main>
    )
}

export default VerifyEmailPage;