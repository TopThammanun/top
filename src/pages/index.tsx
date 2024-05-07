import { Fragment, ReactElement, useEffect, useState } from 'react'
import RootLayout from '@/layouts/root-layout';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head';
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Button } from '@nextui-org/react';

let Snowfall: any;
if (typeof window !== 'undefined') {
  Snowfall = require('react-snowfall').default;
}

type Props = {}

const Home = (props: Props, _props: InferGetStaticPropsType<typeof getStaticProps>) => {
  // const router = useRouter()
  // const { t, i18n } = useTranslation('common')
  const [isClient, setIsClient] = useState(false);

  // const onToggleLanguageClick = (newLocale: string) => {
  //   const { pathname, asPath, query } = router
  //   router.push({ pathname, query }, asPath, { locale: newLocale })
  // }

  // const clientSideLanguageChange = (newLocale: string) => {
  //   try {
  //     i18n.changeLanguage(newLocale);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const changeTo = router.locale === 'en' ? 'th' : 'en'

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
      <h1 className='font-extrabold'>{"Hello I'm Thammanun"}</h1>
      </div>
        {/* <div className='sm:flex items-center gap-3'>
          <h1 className='font-extrabold'>{t('h1')}</h1>
          <span className="waving-hand text-4xl">👋</span>
          <Button
            color='default'
            variant='bordered'
            className='text-white'
            onClick={() => onToggleLanguageClick("th")}
          >
            TH
          </Button>
          <Button
            variant='bordered'
            onClick={() => onToggleLanguageClick("en")}
            className='text-white'
          >
            EN
          </Button>
        </div> */}
        {isClient && <Snowfall />}
      </div>
      {/* <div className="ship">
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
      </div> */}
    </Fragment >
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
    ])),
  },
})

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