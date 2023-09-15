"use client"

import { Router } from "next/router";
import NProgress from "nprogress";
import { Fragment } from "react";

Router.events.on("routeChangeStart", () => {
    NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
    NProgress.done();
});

Router.events.on("routeChangeError", () => {
    NProgress.done();
});

type Props = {
    children: React.ReactNode
}

const NprogressProvider = (props: Props) => {
    return (
        <Fragment>{props.children}</Fragment>
    )
}

export default NprogressProvider