"use client"

import React, { useEffect, useState } from 'react'
import { MenuSidebar } from './Sidebar'
import router from 'next/router'
import { Icon } from '@iconify/react';
import { Button, Card, Tooltip } from '@nextui-org/react';
import NextLink from 'next/link';
import { cn } from '@/lib/utils';
import { Drawer, SwicthThemes } from '@/components/ui';

type Props = {}

const Navbar = (props: Props) => {
    const [isOpenToggle, setIsOpenToggle] = useState(false)

    return (
        <nav className='sticky top-0 z-10'>
            <div className='bg-background py-5 px-8'>
                <Card className='flex flex-row justify-between items-center py-2 px-5 '>
                    <div>
                        <div className='md:hidden'>
                            <div className='cursor-pointer' onClick={() => { setIsOpenToggle(!isOpenToggle) }}>
                                <Icon icon="lucide:menu" className="h-6 w-6" />
                            </div>
                            <Drawer
                                direction='left'
                                open={isOpenToggle}
                                onClose={() => { setIsOpenToggle(!isOpenToggle) }}
                                size={"20rem"}
                                className='px-5'
                            >
                                <MenuSidebar />
                            </Drawer>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <SwicthThemes />
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