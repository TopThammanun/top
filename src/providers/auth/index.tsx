"use client"

import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type Props = {
    children: React.ReactNode
}

//path private
const privateRoute: string[] = []

const AuthProvider = (props: Props) => {
    const router = useRouter()
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        const token = sessionStorage.getItem("token") // or Redux or Cookie or Other
        const isPrivateRoute = privateRoute.some((route) =>
            router.asPath.startsWith(route)
        )
        if (!token && isPrivateRoute) {
            router.push("/") // Path Login
        } else {
            setLoading(false)
        }
    }, [router.asPath])

    if (isLoading) {
        return null // Or you can return a loading
    }

    return props.children
}

export default AuthProvider