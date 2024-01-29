"use client"

import React, { Fragment } from 'react'
import { useTheme } from 'next-themes'
import { Icon } from '@iconify/react';
import { Button } from '@nextui-org/react';

type Props = {}

const SwicthThemes = (props: Props) => {
    const { setTheme } = useTheme()

    return (
        <Fragment>
            <div className='flex relative'>
                <Button
                    isIconOnly
                    variant='bordered'
                    color='primary'
                    className='absolute transition-all scale-100 dark:scale-0 opacity-100 dark:opacity-0'
                    onClick={() => setTheme("dark")}
                >
                    <Icon icon="mingcute:sun-fill" className="h-6 w-6 rotate-0 transition-all dark:-rotate-90" />
                </Button>
                <Button
                    isIconOnly
                    color='primary'
                    variant='bordered'
                    onClick={() => setTheme("light")}
                    className='transition-all scale-0 dark:scale-100 opacity-0 dark:opacity-100'
                >
                    <Icon icon="ph:moon-fill" className="h-6 w-6 rotate-90 transition-all dark:rotate-0" />
                </Button>
            </div>
        </Fragment>
    )
}

export default SwicthThemes