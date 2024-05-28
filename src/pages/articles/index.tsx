import { Fragment, ReactElement, useState } from "react";
import RootLayout from "@/layouts/root-layout";
import MainLayout from "@/layouts/main-layout";
import EditorBlock from "@/components/shared/EditorBlock";
import { Card, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";
import { Divider } from "@nextui-org/react";

type Props = {};

const Articles = (props: Props) => {
  const description =
    "Software engineering is a dynamic field that shapes the digital world we live in. In this article, we will explore the fascinating realm of software engineering, its significance, and its profound impact on our daily lives.";
  const limitedDescription =
    description.length > 300 ? description.slice(0, 300) + "..." : description;

  return (
    <Fragment>
      <div className="mx-auto max-md:mx-4 mt-10 space-y-4 max-w-screen-md">
        <div>
          <h1 className="text-3xl font-bold">NextAuth.js Example</h1>
          <p className="leading-loose">{description}</p>
        </div>
      </div>
    </Fragment>
  );
};
export default Articles;

Articles.getLayout = (page: ReactElement) => {
  return (
    <Fragment>
      <RootLayout>
        <MainLayout>{page}</MainLayout>
      </RootLayout>
    </Fragment>
  );
};
