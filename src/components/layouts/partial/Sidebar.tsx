"use client"

import Link from 'next/link';
import router from 'next/router';
import Image from 'next/image';
import React, { Fragment, ReactElement, ReactNode, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Icon } from '@iconify/react';

type MenuItemProps = {
    path: string
    label: string
    icon: string
}

const MenuItem = (menuItemProps: MenuItemProps) => {
    const active = router.pathname === menuItemProps.path
    return (
        <Link
            href={menuItemProps.path}
            className={`flex items-center gap-2 text-base py-2 pl-4 rounded-xl hover:pl-6 transition-all
                ${active ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-secondary'}`}
        >
            <div className='flex items-center w-fit h-full'>
                <Icon icon={menuItemProps.icon} className='w-6 h-6' />
            </div>
            <div>{menuItemProps.label}</div>
        </Link>
    );
};

export const MenuSidebar = () => {
    return (
        <Fragment>
            <div className='flex items-center gap-3 py-10 pl-5'>
                <Image
                    src="/favicon.ico"
                    width={40}
                    height={40}
                    alt="logo"
                />
                <div className="text-4xl font-semibold">
                    R&N
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='px-4 text-foreground font-semibold'>MENU</div>
                <MenuItem path='/' label='Home' icon='heroicons:home' />
                <MenuItem path='/dashboard' label='Dashboard' icon='lucide:layout-dashboard' />
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className='border-0'>
                        <AccordionTrigger className='pr-4'>
                            <div className='flex items-center gap-2 text-lg pl-4 text-foreground/70'>
                                <Icon icon="heroicons:swatch" className='w-6 h-6' />
                                <div className=' text-base'>Component</div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <MenuItem path='/a' label='Dashboard' icon='lucide:dot' />
                            <MenuItem path='/a' label='Dashboard' icon='lucide:dot' />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className='border-0'>
                        <AccordionTrigger className='pr-4'>
                            <div className='flex items-center gap-2 text-lg pl-4 text-foreground/70'>
                                <Icon icon="heroicons:swatch" className='w-6 h-6' />
                                <div className=' text-base'>Component</div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <MenuItem path='/a' label='Dashboard' icon='lucide:dot' />
                            <MenuItem path='/b' label='Dashboard' icon='lucide:dot' />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </Fragment >)
}

const Sidebar = () => {
    return (
        <div className='max-md:hidden'>
            <div className="h-[100dvh] min-w-[16rem] bg-card border-r transition-all sticky top-0 z-10" >
                <PerfectScrollbar className='px-5'>
                    <MenuSidebar />
                </PerfectScrollbar>
            </div>
        </div>
    )
}

export default Sidebar