"use client";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'

const ProtectedWrapper = ({ children }: { children: ReactNode }) => {
    const session = useSession()
    const router = useRouter()
    if (session.status == "loading") return <></>
    if (session.status == "unauthenticated") {
        router.push("/auth/signin")
        return <></>
    }
    return children
}

export default ProtectedWrapper