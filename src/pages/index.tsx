// import MainLayout from '@/components/layouts/MainLayout'
// import RootLayout from '@/components/layouts/RootLayout'
import { Fragment, ReactElement } from 'react'
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
type Props = {}

const Home = (props: Props) => {
  const { theme, setTheme } = useTheme()

  return (
    <Fragment>
      <div className='flex justify-center items-center gap-5 p-5 '>Tempalte NextJs and NextUI
        <Button color="primary">
          Button
        </Button>
      </div>
      <div className='p-5 rounded-lg border-2'>
        The current theme is: {theme}
        <Button onClick={() => setTheme('light')}>Light Mode</Button>
        <Button onClick={() => setTheme('dark')}>Dark Mode</Button>
      </div>
    </Fragment >
  )
}
export default Home

Home.getLayout = (page: ReactElement) => {
  return (
    <Fragment>
      {/* <RootLayout>
        <MainLayout>
          {page}
        </MainLayout>
      </RootLayout> */}
      {page}
    </Fragment>
  );
};