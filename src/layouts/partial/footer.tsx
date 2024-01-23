"use client"

import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
    return (
        <div className='flex justify-between px-5 py-8'>
            <div className='flex gap-1 items-center'>
                Copyright
                <Icon icon="tdesign:copyright" className='text-lg' />
                2023 | DOUBLE N & N
            </div>
            <div>
                Developer by SATANG BUDSAI
            </div>
        </div>
    )
}

export default Footer