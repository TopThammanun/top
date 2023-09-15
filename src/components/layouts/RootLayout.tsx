"use client"

import Head from 'next/head'
import React, { Fragment, ReactNode } from 'react'

type Props = {
    children: ReactNode
    title?: string
    desc?: string
    keyword?: string
}

const RootLayout = (props: Props) => {
    return (
        <Fragment>
            <Head>
                <title>{props.title || "Template R&N"}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content={props.desc} />
                <meta name="keyword" content={props.keyword} />
            </Head>
            <main>
                {props.children}
            </main>
        </Fragment>
    )
}

export default RootLayout