"use client"

import React, { Fragment } from 'react'
import { useTheme } from 'next-themes'
import { Icon } from '@iconify/react';

type Props = {}

const SwicthThemes = (props: Props) => {
    const { setTheme } = useTheme()

    return (
        (
            <Fragment>
                <div
                    className='flex w-6 h-6  scale-100 transition-all dark:scale-0 cursor-pointer'
                    onClick={() => setTheme("dark")}
                >
                    <Icon icon="heroicons:sun" className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                </div>
                <div
                    onClick={() => setTheme("light")}
                    className='flex w-6 h-6 absolute scale-0 transition-all dark:scale-100 cursor-pointer'
                >
                    <Icon icon="heroicons:moon" className="h-6 w-6 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </div>
            </Fragment>
        )
    )
}

export default SwicthThemes