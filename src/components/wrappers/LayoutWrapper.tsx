"use client";
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'
import Navbar from '../layout/navbar/Navbar'

const excluded: string[] = ["/auth/*"];

const isExcluded = (pathname: string): boolean => {
    return excluded.some(pattern => {
        // Convert "/auth/*" to a regular expression pattern
        const regexPattern = pattern.replace(/\*/g, ".*");
        const regex = new RegExp(`^${regexPattern}$`);
        return regex.test(pathname);
    });
};

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname()
    if (isExcluded(pathname)) {
        return children
    }
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default LayoutWrapper