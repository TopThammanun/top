// import MainLayout from '@/components/layouts/MainLayout'
// import RootLayout from '@/components/layouts/RootLayout'
import { Fragment, ReactElement } from 'react'

type Props = {}

const Home = (props: Props) => {
  return (
    <Fragment>
      <div>Tempalte NextJs and NextUI</div>
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