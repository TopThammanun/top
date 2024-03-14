import { Fragment, ReactElement, useEffect, useState } from 'react'
import RootLayout from '@/layouts/root-layout';
import Head from 'next/head';

let Snowfall: any;
if (typeof window !== 'undefined') {
  Snowfall = require('react-snowfall').default;
}

type Props = {}

const Home = (props: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <Fragment>
      <Head>
        <title>TopThammanun - Home</title>
        <meta
          name="description"
          content="Welcome to TopThammanun's personal website. Explore the world of Thammanun through various projects and content."
        />
        <meta
          name="keywords"
          content="TopThammanun, Thammanun, personal website, projects, React, Next.js"
        />
      </Head>
      <div className="flex flex-col flex-wrap items-center justify-center w-screen h-screen text-center">
        <div className='sm:flex items-center gap-3'>
          <h1 className='font-extrabold'>{`Hello I'm Thammanun`}</h1>
          <span className="waving-hand text-4xl">👋</span>
        </div>
        {isClient && <Snowfall />}
      </div>
      <div className="ship">
        <div className="wrapper">
          <div className="body side left" />
          <div className="body main">
            <div className="wing left" />
            <div className="wing right" />
            <div className="booster" />
            <div className="exhaust" />
          </div>
          <div className="body side right" />
        </div>
      </div>
    </Fragment >
  )
}
export default Home

Home.getLayout = (page: ReactElement) => {
  return (
    <Fragment>
      <RootLayout>
        {page}
      </RootLayout>
    </Fragment>
  );
};