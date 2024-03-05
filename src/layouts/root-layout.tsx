"use client"

import { LoadingScreen } from '@/components/shared'
import { StateType } from '@/store'
import Head from 'next/head'
import React, { Fragment, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Image } from '@nextui-org/react'

type Props = {
    children: ReactNode
    title?: string
    desc?: string
    keyword?: string
}

const RootLayout = (props: Props) => {
    const loaderState = useSelector((state: StateType) => state.loaderState)

    return (
        <Fragment>
            <Head>
                <title>TopThammanun</title>
                <link rel="icon" href="/logo.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <meta name="description" content="Explore TopThammanun's web development portfolio showcasing skills and projects." />
                <meta name="keywords" content="TopThammanun, web development, portfolio, projects, skills" />
                <meta name="author" content="TopThammanun" />
                <meta property="og:title" content="TopThammanun's Portfolio" />
                <meta property="og:description" content="Explore TopThammanun's web development portfolio showcasing skills and projects." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.topthammanun.dev/" />
                <meta property="og:image" content="https://www.topthammanun.dev/og-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@TopThammanun" />
                <meta name="twitter:title" content="TopThammanun's Portfolio" />
                <meta name="twitter:description" content="Explore TopThammanun's web development portfolio showcasing skills and projects." />
                <meta name="twitter:image" content="https://www.topthammanun.dev/twitter-image.jpg" />
            </Head>
            <main>
                <LoadingScreen isLoading={loaderState.loader > 0} />
                {props.children}
            </main>
        </Fragment>
    )
}

export default RootLayout