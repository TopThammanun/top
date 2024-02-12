import { Fragment, ReactElement, useState } from 'react'
import RootLayout from '@/layouts/root-layout';
import MainLayout from '@/layouts/main-layout';
import EditorBlock from '@/components/shared/EditorBlock'

type Props = {}

const Home = (props: Props) => {
  const [content, setContent] = useState({});

  console.log("content", content);

  return (
    <Fragment>
      <EditorBlock content={content} setContent={setContent} />
    </Fragment >
  )
}
export default Home

Home.getLayout = (page: ReactElement) => {
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