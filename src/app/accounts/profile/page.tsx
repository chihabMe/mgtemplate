import ProtectedWrapper from '@/components/wrappers/ProtectedWrapper'
import React from 'react'

const ProfilePage = () => {
    return (
        <ProtectedWrapper>
            <h1>profile page</h1>
        </ProtectedWrapper>
    )
}

export default ProfilePage;