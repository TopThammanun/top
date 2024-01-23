'use client'

import { NextUIProvider as NextProvider } from '@nextui-org/react'
import { ThemeProvider } from "next-themes";
import { useRouter } from 'next/navigation'

export default function NextUIProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <NextProvider navigate={router.push}>
            <ThemeProvider attribute="class" defaultTheme="light">
                {children}
            </ThemeProvider>
        </NextProvider>
    )
}
