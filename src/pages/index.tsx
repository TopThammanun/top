import { Fragment, ReactElement, useEffect, useState } from "react";
import RootLayout from "@/layouts/root-layout";
import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import docAPI from "@/api/doc";

let Snowfall: any;
if (typeof window !== "undefined") {
  Snowfall = require("react-snowfall").default;
}

type Props = {};

const Home = (
  props: Props,
  _props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const getPostAll = useQuery({
    queryKey: ["all"],
    queryFn: (): Promise<any> => docAPI.getAll(),
  });
  const [isClient, setIsClient] = useState(false);
  const [firstId, setFirstId] = useState<string>("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (getPostAll.data) {
      setFirstId(getPostAll.data[0].id);
    }
  }, [getPostAll.data]);

  return (
    <Fragment>
      <Head>
        <title>TopThammanun</title>
        <meta
          name="description"
          content="Discover TopThammanun's personal website. Dive into Thammanun's projects, insights, and content uniquely crafted in Next.js."
        />
        <meta
          name="keywords"
          content="TopThammanun, Thammanun, personal website, projects, React, Next.js, technology"
        />
        <link rel="canonical" href="https://www.topthammanun.com" />
      </Head>
      <div className="flex flex-col items-center justify-center w-screen h-screen text-center">
        <div className="sm:flex items-center gap-3">
          <h1 className="font-extrabold">{"Hello, I'm Thammanun"}</h1>
        </div>
        <div className="flex gap-2">
          <Button
            isLoading={getPostAll.isLoading}
            color="secondary"
            href={`/create/${firstId}`}
            as={Link}
            className="py-6 px-12 text-base text-white font-semibold"
          >
            Play Tiptap Editor!!
          </Button>
          <Button
            isLoading={getPostAll.isLoading}
            color="primary"
            href={`/docs`}
            as={Link}
            className="py-6 px-12 text-base text-white font-semibold"
          >
            View
          </Button>
        </div>

        {isClient && <Snowfall />}
      </div>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

export default Home;

Home.getLayout = (page: ReactElement) => {
  return (
    <Fragment>
      <RootLayout>{page}</RootLayout>
    </Fragment>
  );
};
