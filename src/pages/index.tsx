import { Fragment, ReactElement, useEffect, useState } from 'react';
import RootLayout from '@/layouts/root-layout';
import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

let Snowfall: any;
if (typeof window !== 'undefined') {
  Snowfall = require('react-snowfall').default;
}

type Props = {}

const Home = (props: Props, _props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>TopThammanun</title>
        <meta name="description" content="Discover TopThammanun's personal website. Dive into Thammanun's projects, insights, and content uniquely crafted in Next.js." />
        <meta name="keywords" content="TopThammanun, Thammanun, personal website, projects, React, Next.js, technology" />
        <link rel="canonical" href="https://www.topthammanun.com" />
      </Head>
      <div className="flex flex-col items-center justify-center w-screen h-screen text-center">
        <div className='sm:flex items-center gap-3'>
          <h1 className='font-extrabold'>{"Hello, I'm Thammanun"}</h1>
        </div>
        {isClient && <Snowfall />}
      </div>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

export default Home;

Home.getLayout = (page: ReactElement) => {
  return (
    <Fragment>
      <RootLayout>
        {page}
      </RootLayout>
    </Fragment>
  );
};
