import { cn } from '@nextui-org/react'
import React, { ReactNode } from 'react'

type Props = {
    children?: ReactNode
    isBackground?: boolean
    minHeightScreen?: boolean
    className?: string
}

const Container = (props: Props) => {
    const { children, className, isBackground: background = false, minHeightScreen: minHeigthScreen = false } = props

    return (
        <section className={cn(background && "bg-glass", minHeigthScreen && "flex flex-col justify-center min-h-[100dvh]")}>
            <div className='flex justify-center'>
                <div className={cn('flex flex-col w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl max-xl:px-5', className)}>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default Container