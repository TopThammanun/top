"use client"

import React, { useState } from 'react'
import { MenuSidebar } from './Sidebar'
import router from 'next/router'
import { Icon } from '@iconify/react';
import { Button, Card, Tooltip } from '@nextui-org/react';
import NextLink from 'next/link';
import { cn } from '@/lib/utils';

type Props = {}

const Navbar = (props: Props) => {
    const [isOpenToggle, setIsOpenToggle] = useState(false)
    return (
        <nav className='sticky top-0 z-10'>
            <div className='bg-background py-5 px-8'>
                <Card className='flex flex-row justify-between items-center py-2 px-5 '>
                    <div>
                        <div className='md:hidden'>
                            <div onClick={() => { setIsOpenToggle(!isOpenToggle) }}>
                                <Icon icon="lucide:menu" className="h-6 w-6" />
                            </div>
                            <div className={cn("flex fixed top-0 left-0 z-50 w-full h-[100dvh] overflow-y-auto transition-all",
                                isOpenToggle ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0")}
                            >
                                <div className='w-[20rem] bg-background px-5 drop-shadow-xl h-[100dvh]'>
                                    <MenuSidebar />
                                </div>
                                <div className='flex-grow  bg-background/80' onClick={() => { setIsOpenToggle(!isOpenToggle) }} />
                            </div>
                            {/* <Sheet>
                                <SheetTrigger>
                                    <Icon icon="lucide:menu" className="h-6 w-6 mt-2" />
                                </SheetTrigger>
                                <SheetContent side={"left"} className='overflow-y-auto hidden-scrollbar w-[20rem]'>
                                    <MenuSidebar />
                                </SheetContent>
                            </Sheet> */}
                        </div>
                    </div>
                    <div className='flex items-center gap-1'>
                        <Tooltip showArrow={true} content="ออกจากระบบ" delay={0} closeDelay={200} >
                            <NextLink href={"./"} className='p-2'>
                                <Icon icon="lucide:log-out" className="h-6 w-6" />
                            </NextLink>
                        </Tooltip>
                    </div>
                </Card>
            </div >
        </nav >
    )
}

export default Navbar