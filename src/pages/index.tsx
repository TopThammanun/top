// import MainLayout from '@/components/layouts/MainLayout'
// import RootLayout from '@/components/layouts/RootLayout'
import { Fragment, ReactElement } from 'react'
import { Button } from "@nextui-org/react";

type Props = {}

const Home = (props: Props) => {
  return (
    <Fragment>
      <div className='flex justify-center items-center gap-5 p-5'>Tempalte NextJs and NextUI
        <Button color="primary">
          Button
        </Button>
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