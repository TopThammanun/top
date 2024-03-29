import { SignUp } from "@clerk/nextjs";
import React, { Fragment, ReactElement } from "react";
import MainLayout from '@/layouts/main-layout';
import RootLayout from '@/layouts/root-layout';

export default function Index() {
    return (
        <div className="flex justify-center mt-20">
            <SignUp />
        </div>
    );
}

Index.getLayout = (page: ReactElement) => {
    return (
        <Fragment>
            <RootLayout>
                <MainLayout>
                    {page}
                </MainLayout>
            </RootLayout>
        </Fragment>
    );
};