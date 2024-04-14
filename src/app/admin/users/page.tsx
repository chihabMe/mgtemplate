"use client";
import { User } from '@prisma/client'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading,setIsLoading]= useState(false)
    useEffect(()=>{
        fetch("/api/accounts/users").then(res=>res.json()).then(data=>{
            setUsers(data)
            setIsLoading(false)
        })
    },[])
    if(isLoading)return <h1>loading</h1>
    if(!users)return <h1>no users</h1>
    return (
        <main>{users.map(user=>(<h1>{user.username}</h1>))}</main>
    )
}

export default page