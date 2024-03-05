import { Fragment, ReactElement, useEffect, useState } from 'react'
import RootLayout from '@/layouts/root-layout';
import MainLayout from '@/layouts/main-layout';
import EditorBlock from '@/components/shared/EditorBlock'
import { Card, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";
import { Divider } from "@nextui-org/react";

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
      <div className="flex flex-col flex-wrap items-center justify-center w-screen h-screen text-center">
        <div className='sm:flex items-center gap-3'>
          <h1 className='font-extrabold'>{`Hello I'm Thammanun`}</h1>
          <span className="waving-hand text-4xl">👋</span>
        </div>
        {isClient && <Snowfall />}
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