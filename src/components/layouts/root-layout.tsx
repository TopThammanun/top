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
                <title>{props.title || "HealthService CMU"}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content={props.desc} />
                <meta name="keyword" content={props.keyword} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>
            <main>
                {props.children}
            </main>
        </Fragment>
    )
}

export default RootLayout