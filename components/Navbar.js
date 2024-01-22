import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function Navbar() {

    const router = useRouter();
    const {pathname} = router

    const inactiveLink = 'flex gap-1 p-1 text-gray-500';
    const activeLink = 'flex gap-1 p-1 text-blue-500 rounded';

    return (
        <div className='flex justify-between items-center w-full h-20 px-4 text-white bg-gradient-to-b from-black to-gray-800 text-gray-500 sticky nav'>
            <div>
                <Link href={"/"} className='flex gap-1 text-gray-500'>
                    Home
                </Link>
            </div>
            <ul className='flex'>
                <li className='nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline'>
                    <Link className={pathname === ('/news') ? activeLink : inactiveLink} href={"/news"}>News</Link>
                </li>
            </ul>
        </div>
    )
}
