"use client"

import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
    return (
        <div className='px-5 py-8 flex gap-1 items-center'>
            Copyright
            <Icon icon="tdesign:copyright" className='text-lg' />
            2023 | HealthService ChiangMai University
        </div>
    )
}

export default Footer