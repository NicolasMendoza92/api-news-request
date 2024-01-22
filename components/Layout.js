import React from 'react'
import Navbar from './Navbar'

export default function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <div className='flex-grow p-4'>
                {children}
            </div>
        </div>
    )
}
