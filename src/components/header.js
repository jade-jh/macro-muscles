'use client'
import React from 'react';
import Link from 'next/link'; // Import Link from Next.js
import { usePathname } from 'next/navigation'

export const Header = () => {
    const pathname = usePathname();
    return (
    <header className='flex w-full items-center justify-center px-4 py-4 md:px-12'>
        <div className="flex max-w-[1400px] shrink grow items-center">
        <div className="max-w-[140px] grow text-2xl font-bold md:text-3xl text-[#f4e8de]">
            Macro Muscles
        </div>
        <div className="grow" />
        {pathname != '/login' ? 
            <div>
            <Link href="/api/logout" passHref>
                <button className="w-full px-4 py-2 bg-[#715f4e] text-[#f4e8de] rounded-lg hover:bg-[#5d4b40]">Logout</button>
            </Link>
            </div>
            : ''}
        </div>
    </header>
);}
    