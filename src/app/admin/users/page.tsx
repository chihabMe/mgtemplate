import { User } from '@prisma/client'
import React, { useEffect, useState } from 'react'

import { serverApi as api } from "@/trpc/server"
const page = () => {
    return (
        <main>
            <ListOfUsers />
        </main>
    )
}

async function ListOfUsers() {
    const users = await api.users.getAllUsers()
    return (
        <ul>
            {users.data.map(user => (<li key={user.id}>{user.username}</li>))}
        </ul>
    )

}
export default page