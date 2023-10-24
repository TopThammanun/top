"use client"

import React, { ReactNode } from 'react'
import Navbar from './partial/navbar'
import Footer from './partial/footer'
import Sidebar from './partial/sidebar'

type Props = {
    children: ReactNode
}

const MainLayout = (props: Props) => {
    return (
        <div className="flex flex-row min-h-[100dvh] max-w-screen">
            <Sidebar />
            <div className="w-full">
                <div className='flex flex-col min-h-[100dvh]'>
                    <Navbar />
                    <div className="flex-grow">
                        <div className="px-6 pb-6 max-md:px-5 max-md:pb-5">
                            {props.children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default MainLayout