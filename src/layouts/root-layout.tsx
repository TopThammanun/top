"use client"

import GlobaAPILoader from '@/api/base/apiLoading'
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
    const loadingScreenReducerData = useSelector((state: ReducerType) => state.loadingScreenReducer)
    const isLoadingScreen = loadingScreenReducerData.countLoadingAPI && loadingScreenReducerData.countLoadingAPI > 0 || loadingScreenReducerData.isLoadingScreen
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
                <GlobaAPILoader/>
                {props.children}
            </main>
        </Fragment>
    )
}

export default RootLayout