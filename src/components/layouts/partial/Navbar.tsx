"use client"

import React, { useState } from 'react'
import { MenuSidebar } from './sidebar'
import router from 'next/router'
import { Icon } from '@iconify/react';
import { Button, Card, Tooltip } from '@nextui-org/react';
import { Drawer, SwicthThemes } from '@/components/ui';
import { useDispatch, useSelector } from 'react-redux'

type Props = {}

const Navbar = (props: Props) => {
    const [isOpenToggle, setIsOpenToggle] = useState(false)
    const dispatch = useDispatch()
    const logout = () => {
        router.push('/')
    }
    return (
        <nav className='sticky top-0 z-[40]'>
            <div className='bg-gradient-to-b from-background from-60% to-background/0 p-6 pt-5 max-md:p-5  max-md:pt-3'>
                <Card className='flex flex-row justify-between items-center py-2 px-5'>
                    <div>
                        <div className='lg:hidden'>
                            <div className='cursor-pointer' onClick={() => { setIsOpenToggle(!isOpenToggle) }}>
                                <Icon icon="lucide:menu" className="h-6 w-6" />
                            </div>
                            <Drawer
                                direction='left'
                                open={isOpenToggle}
                                onClose={() => { setIsOpenToggle(!isOpenToggle) }}
                                size={"18rem"}
                                className='px-5'
                            >
                                <MenuSidebar />
                            </Drawer>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <SwicthThemes />
                        <Tooltip showArrow={true} content="ออกจากระบบ" delay={0} closeDelay={200} >
                            <Button isIconOnly variant='light' onClick={logout}>
                                <Icon icon="lucide:log-out" className="h-6 w-6" />
                            </Button>
                        </Tooltip>
                    </div>
                </Card>
            </div >
        </nav >
    )
}

export default Navbar