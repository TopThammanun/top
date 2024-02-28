"use client"

import React, { useState, ReactNode } from 'react'
import { MenuSidebar } from './sidebar'
import router from 'next/router'
import { Icon } from '@iconify/react';
import { Button, Card, Tooltip } from '@nextui-org/react';
import { Drawer, SwicthThemes } from '@/components/shared';
import { useDispatch, useSelector } from 'react-redux'
import Link from "next/link";
import {
    OrganizationSwitcher,
    SignedIn,
    UserButton,
    useUser
} from "@clerk/nextjs";
type Props = {
    breadcrumb?: ReactNode
}

const Navbar = (props: Props) => {
    const { breadcrumb } = props
    const { isSignedIn, isLoaded } = useUser();
    const [isOpenToggle, setIsOpenToggle] = useState(false)
    const dispatch = useDispatch()
    const logout = () => {
        router.push('/')
    }

    return (
        <nav className='sticky top-0 z-[40]'>
            <div className='bg-gradient-to-b from-background from-40% to-background/0 p-6 pt-5 max-md:p-5  max-md:pt-3'>
                <Card className='flex flex-row justify-between items-center py-2 px-5'>
                    <Link className='flex justify-center items-center gap-2 cursor-pointer max-lg:hidden' href={"/"}>
                        <Icon icon="tabler:sandbox" className="h-9 w-9" />
                        <div className='font-bold'>TOP</div>
                    </Link>
                    <div className='flex items-center gap-5'>
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
                        {breadcrumb && breadcrumb}
                    </div>
                    <div className='flex items-center lg:gap-10 gap-2'>
                        <div className="flex-initial">
                            <div className="flex justify-end items-center relative">
                                <SignedIn>
                                    <Link className='flex items-center gap-2 mr-4 justify-center cursor-pointer' href={"/create"}>
                                        <Icon icon="jam:write-f" className="h-5 w-5" />
                                        <div className='font-semibold text-sm'>Write</div>
                                    </Link>
                                    <div className="hidden sm:block">
                                        <OrganizationSwitcher afterCreateOrganizationUrl="/" />
                                    </div>
                                    <div className="block sm:hidden">
                                        <OrganizationSwitcher
                                            afterCreateOrganizationUrl="/"
                                            appearance={{
                                                elements: {
                                                    organizationSwitcherTriggerIcon: `hidden`,
                                                    organizationPreviewTextContainer: `hidden`,
                                                    organizationSwitcherTrigger: `pr-0`,
                                                },
                                            }}
                                        />
                                    </div>
                                    <UserButton afterSignOutUrl="/" />
                                </SignedIn>
                                {!isSignedIn && (
                                    <Link href={"/sign-in"}>
                                        <Button color="default" className='font-semibold' startContent={<Icon icon="ic:baseline-login" className="h-6 w-6" />}>
                                            Login
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div >
                        <SwicthThemes />
                    </div>
                </Card>
            </div >
        </nav >
    )
}

export default Navbar