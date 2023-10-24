"use client"

import React, { ReactNode } from 'react'
import Navbar from './partial/Navbars'
import Footer from './partial/Footers'
import Sidebar from './partial/Sidebars'

type Props = {
    children: ReactNode
}

const MainLayout = (props: Props) => {
    return (
        <div className="flex flex-row min-h-[100dvh] max-w-screen">
            <Sidebar />
            <div className="w-full">
                <div className='flex flex-col min-h-[100dvh] '>
                    <Navbar />
                    <div className="flex-grow">
                        <main className="px-8 pb-5">
                            {props.children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout