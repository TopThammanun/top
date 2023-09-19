"use client"

import NextLink from 'next/link';
import router from 'next/router';
import Image from 'next/image';
import React, { Fragment, ReactElement, ReactNode, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Icon } from '@iconify/react';
import { Accordion, AccordionItem, Card } from "@nextui-org/react";
import { cn } from '@/lib/utils';

type MenuItemProps = {
    path: string
    label: string
    icon: string
    isPaddingLeft: boolean
}

const MenuItem = (menuItemProps: MenuItemProps) => {
    const active = router.pathname === menuItemProps.path
    return (
        <NextLink
            href={menuItemProps.path}
            className={cn("flex items-center gap-3 text-base py-2 rounded-xl hover:pl-6 transition-all",
                active ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-default-200/70 hover:text-default-foreground',
                menuItemProps.isPaddingLeft ? "pl-4" : "pl-0"
            )}
        >
            <div className='flex items-center w-fit h-full'>
                <Icon icon={menuItemProps.icon} className='w-6 h-6' />
            </div>
            <div>{menuItemProps.label}</div>
        </NextLink>
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
                <div className='text-foreground font-semibold px-4'>MENU</div>
                <MenuItem path='/' label='Home' icon='heroicons:home' isPaddingLeft={true} />
                <MenuItem path='/dashboard' label='Dashboard' icon='lucide:layout-dashboard' isPaddingLeft={true} />
                <Accordion selectionMode="multiple" isCompact showDivider={false}>
                    <AccordionItem
                        key="1"
                        aria-label="components"
                        startContent={
                            <Icon icon="heroicons:swatch" className='w-6 h-6' />
                        }
                        title="Components"
                        className='pl-2'
                    >
                        <MenuItem path='/a' label='Dashboard' icon='lucide:dot' isPaddingLeft={false} />
                        <MenuItem path='/a' label='Dashboard' icon='lucide:dot' isPaddingLeft={false} />
                    </AccordionItem>
                </Accordion>
                <Accordion selectionMode="multiple" isCompact showDivider={false}>
                    <AccordionItem
                        key="1"
                        aria-label="components"
                        startContent={
                            <Icon icon="heroicons:swatch" className='w-6 h-6' />
                        }
                        title="Components"
                        className='pl-2'
                    >
                        <MenuItem path='/a' label='Dashboard' icon='lucide:dot' isPaddingLeft={false} />
                        <MenuItem path='/a' label='Dashboard' icon='lucide:dot' isPaddingLeft={false} />
                    </AccordionItem>
                </Accordion>
                <MenuItem path='/dashboard' label='Dashboard' icon='lucide:layout-dashboard' isPaddingLeft={true} />
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