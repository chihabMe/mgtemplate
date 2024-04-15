"use client";
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

const Navbar = () => {
    const router = useRouter()
    const handleSignout = () => {
        signOut()
        router.replace("/")
    }
    return (
        <nav>
            <button onClick={handleSignout} className="bg-red-400 text-white rounded-md px-2 py-1 cursor-pointer "> logout</button>
        </nav>
    )
}

export default Navbar