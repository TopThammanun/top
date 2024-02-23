"use client"

import React, { Fragment, ReactNode } from 'react'
import Navbar from './partial/navbar'
import Footer from './partial/footer'
import Sidebar from './partial/sidebar'

type Props = {
    children: ReactNode
    breadcrumb?: ReactNode
}

const MainLayout = (props: Props) => {
    const { breadcrumb } = props

    return (
        <Fragment>
            <div className='flex flex-row min-h-[100dvh] max-w-screen'>
                <div className="w-full">
                    <div className='flex flex-col min-h-[100dvh]'>
                        <Navbar breadcrumb={breadcrumb} />
                        <div className="flex-grow">
                            <div className="px-1 pb-6 md:px-3 max-md:pb-5">
                                {props.children}
                            </div>
                        </div>
                        {/* <Footer /> */}
                    </div>
                </div >
            </div >
        </Fragment>
    )
}

export default MainLayout