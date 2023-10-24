
"use client"
import NextLink from 'next/link';
import router from 'next/router';
import React, { Fragment, ReactElement, ReactNode, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Icon } from '@iconify/react';
import { Accordion, AccordionItem, Card } from "@nextui-org/react";
import { cn } from '@/lib/utils';
import { Image } from '@/components/ui';

type MenuItemProps = {
    path: string
    label: string
    icon: string
    leftElement?: ReactNode;
    disablePadding?: boolean
    disable?: boolean
}

const MenuItem = (menuItemProps: MenuItemProps) => {
    const active = router.pathname === menuItemProps.path
    return (
        <div
            className={cn("flex justify-between items-center gap-3 text-base py-2 rounded-xl transition-all",
                !active && menuItemProps.disable ? 'text-foreground/60' : active ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-default-200/70 hover:text-default-foreground',
                menuItemProps.disablePadding ? "pl-0" : "px-4",
                menuItemProps.disable ? "cursor-default" : "cursor-pointer hover:pl-6"
            )}
            onClick={() => !menuItemProps.disable && router.push(menuItemProps.path)}
        >
            <div className='flex gap-3 items-center'>
                <div className='flex items-center w-fit h-full'>
                    <Icon icon={menuItemProps.icon} className='w-6 h-6' />
                </div>
                <div>{menuItemProps.label}</div>
            </div>
            {menuItemProps.leftElement &&
                <div>{menuItemProps.leftElement}</div>
            }
        </div>
    );
};

export const MenuSidebar = () => {
    return (
        <Fragment>
            <div className='flex py-7'>
                <div className='flex w-full justify-center items-center gap-5 py-3 border-2 border-primary bg-primary-50/50 rounded-2xl'>
                    <Image
                        width={55}
                        src="/favicon.ico"
                        alt="logo"
                        className='rounded-none'
                    />
                    <div className='flex flex-col text-primary text-2xl font-bold'>
                        <div> HEALTH </div>
                        <div className="-mt-1"> SERVICE </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='text-foreground font-semibold px-4'>MENU</div>
                <MenuItem path='/admin/create-patient' label='เพิ่มข้อมูลผู้ป่วย' icon='tabler:users-plus' />
                <MenuItem path='' label='Dashboard' icon='akar-icons:dashboard' disable />
                <MenuItem path='/admin/information-patient' label='ข้อมูลผู้ป่วย' icon='solar:document-add-outline' />
                <MenuItem path='' label='Complete' icon='icon-park-outline:folder-success' disable />
                {/* <Accordion selectionMode="multiple" isCompact showDivider={false}>
                    <AccordionItem
                        key="1"
                        aria-label="components"
                        startContent={
                            <Icon icon="heroicons:swatch" className='w-6 h-6' />
                        }
                        title="Components"
                        className='pl-2'
                    >
                        <MenuItem path='' label='Dashboard' icon='lucide:dot' disablePadding={true} />
                        <MenuItem path='' label='Dashboard' icon='lucide:dot' disablePadding={true} />
                    </AccordionItem>
                </Accordion> */}
            </div>
        </Fragment >)
}

const Sidebar = () => {
    return (
        <div className='max-lg:hidden'>
            <Card className="h-[100dvh] w-[16rem] bg-background transition-all sticky top-0 z-[41] rounded-none dark:border-r" >
                <PerfectScrollbar className='px-5'>
                    <MenuSidebar />
                </PerfectScrollbar>
            </Card>
        </div>
    )
}

export default Sidebar