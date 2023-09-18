"use client"

import Link from 'next/link';
import router from 'next/router';
import Image from 'next/image';
import React, { Fragment, ReactElement, ReactNode, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Icon } from '@iconify/react';
import { Accordion, AccordionItem, Card } from "@nextui-org/react";

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
            className={`flex items-center gap-3 text-base py-2 pl-4 my-2 rounded-xl hover:pl-6 transition-all
                ${active ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-default-100 hover:text-default-foreground'}`}
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
            <div className='flex flex-col'>
                <div className='text-foreground font-semibold px-4 mb-2'>MENU</div>
                <MenuItem path='/' label='Home' icon='heroicons:home' />
                <MenuItem path='/dashboard' label='Dashboard' icon='lucide:layout-dashboard' />
                <Accordion selectionMode="multiple" showDivider={false}>
                    <AccordionItem
                        key="1"
                        aria-label="components"
                        startContent={
                            <Icon icon="heroicons:swatch" className='w-6 h-6' />
                        }
                        title="components"
                        className='pl-2'
                    >
                        <MenuItem path='/a' label='Dashboard' icon='lucide:dot' />
                        <MenuItem path='/a' label='Dashboard' icon='lucide:dot' />
                    </AccordionItem>
                    <AccordionItem
                        key="2"
                        aria-label="components"
                        startContent={
                            <Icon icon="heroicons:swatch" className='w-6 h-6' />
                        }
                        title="components"
                        className='pl-2'
                    >
                        <MenuItem path='/a' label='Dashboard' icon='lucide:dot' />
                        <MenuItem path='/a' label='Dashboard' icon='lucide:dot' />
                    </AccordionItem>
                </Accordion>
                <MenuItem path='/dashboard' label='Dashboard' icon='lucide:layout-dashboard' />
            </div>
        </Fragment >)
}

const Sidebar = () => {
    return (
        <div className='max-md:hidden'>
            <Card className="h-[100dvh] w-[16rem] bg-background transition-all sticky top-0 z-20 rounded-none" >
                <PerfectScrollbar className='px-5'>
                    <MenuSidebar />
                </PerfectScrollbar>
            </Card>
        </div>
    )
}

export default Sidebar