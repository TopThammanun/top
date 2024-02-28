
"use client"
import router from 'next/router';
import React, { Fragment, ReactElement, ReactNode, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Icon } from '@iconify/react';
import { Accordion, AccordionItem, Avatar, Card, Spacer, cn } from "@nextui-org/react";
import { Image } from '@nextui-org/react';
import {
    UserButton,
    useUser,
} from "@clerk/nextjs/app-beta/client";

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
            className={cn("flex justify-between items-center gap-1 text-sm py-1 rounded-xl transition-all",
                !active && menuItemProps.disable ? 'text-foreground/60' : active ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-default-200/70 hover:text-default-foreground',
                menuItemProps.disablePadding ? "pl-0" : "px-4",
                menuItemProps.disable ? "cursor-default" : "cursor-pointer hover:pl-6"
            )}
            onClick={() => !menuItemProps.disable && router.push(menuItemProps.path)}
        >
            <div className='flex gap-3 items-center'>
                <div className='flex items-center w-fit h-full'>
                    <Icon icon={menuItemProps.icon} className='w-4 h-4' />
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
            <Spacer y={4} />
            <div className='flex flex-col gap-2'>
                <MenuItem path='#' label='Search' icon='ic:outline-search' />
                <MenuItem path='#' label='Setting' icon='ic:baseline-settings' />
                <MenuItem path='#' label='Page' icon='iconamoon:file-document-duotone' />
                <MenuItem path='#' label='Add a page' icon='material-symbols:add' />
            </div>
        </Fragment >)
}

const Sidebar = () => {
    const { user, isLoaded } = useUser();
    return (
        <Card className="max-lg:hidden h-[100dvh] w-[40rem] bg-background transition-all sticky top-0 z-[41] rounded-none dark:border-r" >
            <div className='flex gap-3 items-center'>
                {isLoaded ? (
                    <>
                        <UserButton
                            afterSignOutUrl='/'
                            appearance={{
                                elements: {
                                    rootBox: "w-full bg-transparent group-hover:bg-accent h-[47px]",
                                    userButtonTrigger:
                                        "pl-8 py-3 cursor-pointer h-full w-full rounded-none flex justify-start focus:shadow-none hover:bg-default-200/70 hover:text-default-foreground",
                                },
                            }} />
                        <div className='font-semibold absolute left-20 mt-2 flex gap-3 cursor-pointer truncate overflow-hidden w-max pointer-events-none select-none'>
                            {user?.fullName}
                            <Icon icon="material-symbols:unfold-more" className='w-5 h-5' />
                        </div>
                    </>) : (<div className="h-[47px] cursor-pointer py-3 pl-5 pr-12 w-full flex gap-3 shrink-0 animate-pulse bg-default-200/70">
                        <div className="h-6 w-6 bg-accent rounded-sm" />
                        <div className="flex-1 h-6 bg-accent rounded-sm" />
                    </div>)
                }
            </div>
            <PerfectScrollbar className='px-5'>
                <MenuSidebar />
            </PerfectScrollbar>
        </Card>
    )
}

export default Sidebar