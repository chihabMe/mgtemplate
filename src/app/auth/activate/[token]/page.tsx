import { serverApi } from '@/trpc/server'
import { TRPCError } from '@trpc/server'
import { url } from 'inspector'
import React from 'react'

interface PageProps {
    params: { token: string }
}
const ActivateAccountPage = async ({ params }: PageProps) => {
    const activationToken = decodeURIComponent(params.token)
    const userId = activationToken.split(":")[0]
    const token = activationToken.split(":")[1]
    const activate = await serverApi.users.activateUser({
        token,
        userId
    })
    console.log(activate)
    if (activate instanceof TRPCError)
        throw new Error("invalid activation link")
    return (
        <>
            <h2>{userId}</h2>
            <div>{token}</div>
        </>
    )
}

export default ActivateAccountPage;