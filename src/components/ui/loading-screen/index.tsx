import React, { Fragment } from 'react'
import { Image } from '@nextui-org/react';

type Props = {
    label?: string
}

const LoadingScreen = (props: Props) => {
    const { label } = props
    return (
        <Fragment>
            <div className='fixed top-0 flex flex-col gap-5 justify-center items-center bg-background h-[100dvh] w-screen z-[100000]'>
                <Image
                    width={70}
                    src="/logo/healthservice.png"
                    alt="logo"
                    className='rounded-none loadingLogo '
                />
                {label ? label : "loading..."}
            </div>
        </Fragment>
    )
}

export default LoadingScreen