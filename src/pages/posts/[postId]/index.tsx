import { Fragment, ReactElement, useState } from 'react'
import RootLayout from '@/layouts/root-layout';
import MainLayout from '@/layouts/main-layout';
import { Card, CardBody } from "@nextui-org/react";

type Props = {}

const Post = (props: Props) => {
    return (
        <Fragment>
            <div className="flex justify-center px-2 mt-5 w-full min-h-screen">
                <div>
                    <article className="max-w-[63rem]">
                        <h1 className="text-3xl font-bold">Half-Life: A Game-Changer in the World of First-Person Shooters</h1>
                        <p className="font-thin">
                            November 4, 2023 / Author: admin
                        </p>
                        {/* <article
                dangerouslySetInnerHTML={{ __html: contentHtml }}
                className="article"
              /> */}
                    </article>
                </div>
            </div>
        </Fragment >
    )
}
export default Post

Post.getLayout = (page: ReactElement) => {
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