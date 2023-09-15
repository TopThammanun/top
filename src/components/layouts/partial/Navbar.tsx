"use client"

import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet'
import { MenuSidebar } from './Sidebar'
import SwicthThemes from '@/components/swicth-themes'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import router from 'next/router'
import { Icon } from '@iconify/react';

type Props = {}

const Navbar = (props: Props) => {
    return (
        <nav className='sticky top-0 z-10'>
            <div className='bg-background py-5 px-8 '>
                <Card className='flex justify-between items-center py-2 px-5 '>
                    <div>
                        <div className='md:hidden'>
                            <Sheet>
                                <SheetTrigger>
                                    <Icon icon="lucide:menu" className="h-7 w-7 mt-2" />
                                </SheetTrigger>
                                <SheetContent side={"left"} className='overflow-y-auto hidden-scrollbar w-[20rem]'>
                                    <MenuSidebar />
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                    <div className='flex items-center gap-1'>
                        <SwicthThemes />
                        <Button variant={'ghost'} size="icon" onClick={() => router.push('/')}>
                            <Icon icon="lucide:log-out" className="h-5 w-5" />
                        </Button>
                    </div>
                </Card>
            </div>
        </nav>
    )
}

export default Navbar