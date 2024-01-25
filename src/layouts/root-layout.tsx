"use client"

import { LoadingScreen } from '@/components/shared'
import { ReducerType } from '@/redux/store'
import Head from 'next/head'
import React, { Fragment, ReactNode } from 'react'
import { useSelector } from 'react-redux'

type Props = {
    children: ReactNode
    title?: string
    desc?: string
    keyword?: string
}

const RootLayout = (props: Props) => {
    const globalReducer = useSelector((state: ReducerType) => state.globalReducer)

    return (
        <Fragment>
            <Head>
                <title>{props.title || "DoubleN"}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content={props.desc} />
                <meta name="keyword" content={props.keyword} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>
            <main>
                <LoadingScreen isLoading={globalReducer.loader > 0} />
                {props.children}
            </main>
        </Fragment>
    )
}

export default RootLayout