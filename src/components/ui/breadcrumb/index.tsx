import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
    className?: string
}

const Breadcrumb = (props: Props) => {
    const { children, className } = props;

    return (
        <div className={cn('flex items-center gap-2 text-lg font-medium text-foreground/50 [&>*:last-child]:text-foreground/80', className)}>
            {children}
        </div>
    )
}

export default Breadcrumb