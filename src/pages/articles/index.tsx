import { Fragment, ReactElement, useState } from 'react'
import RootLayout from '@/layouts/root-layout';
import MainLayout from '@/layouts/main-layout';
import EditorBlock from '@/components/shared/EditorBlock'
import { Card, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";
import { Divider } from "@nextui-org/react";

type Props = {}

const Articles = (props: Props) => {
    const description = "Software engineering is a dynamic field that shapes the digital world we live in. In this article, we will explore the fascinating realm of software engineering, its significance, and its profound impact on our daily lives."
    const limitedDescription =
        description.length > 300 ? description.slice(0, 300) + "..." : description;

    return (
        <Fragment>
            <div className="flex flex-col flex-wrap items-center justify-center mt-10 space-y-4 w-full">
                <section className="w-full lg:w-fit">
                    <h2 className='pl-4 mb-5'>List of articles</h2>
                    <section className="flex justify-center px-4 w-full min-h-screen">
                        <div className="grid grid-cols-1 h-full w-[61rem] cursor-pointer">
                            <div key={`1-post`}>
                                <div className="h-full">
                                    <div className='flex gap-10'>
                                        <div>
                                            <Link href={"/posts/" + '1'} className="text-xl font-semibold">
                                                The World of Software Engineering: Crafting the Digital Landscape
                                            </Link>
                                            <br />
                                            <span className="font-thin">November 3, 2023</span>
                                            <br />
                                            <div>
                                                <div className='max-lg:hidden'>
                                                    <Link href={"/posts/" + '1'}>{limitedDescription}</Link>
                                                    <Link href={"/posts/" + '1'}> Read More...</Link>
                                                </div>
                                                <div className='lg:hidden flex gap-10 justify-between'>
                                                    <Link href={"/posts/" + '1'}> Read More...</Link>
                                                    <Image
                                                        removeWrapper
                                                        radius="none"
                                                        alt="Relaxing app background"
                                                        className="w-24 h-24"
                                                        src={"/images/@mock/200x200.jpg"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='max-lg:hidden'>
                                            <Image
                                                removeWrapper
                                                radius="none"
                                                alt="Relaxing app background"
                                                className="w-52 h-24"
                                                src={"/images/@mock/200x200.jpg"}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Divider className="my-4" key={`1-divider`} />
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        </Fragment >
    )
}
export default Articles

Articles.getLayout = (page: ReactElement) => {
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