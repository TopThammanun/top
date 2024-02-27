import { Fragment, ReactElement, useState } from 'react'
import RootLayout from '@/layouts/root-layout';
import MainLayout from '@/layouts/main-layout';
import { Card, CardBody } from "@nextui-org/react";
import EditorBlock from '@/components/shared/EditorBlock';

type Props = {}

const Create = (props: Props) => {
    const [content, setContent] = useState([]);

    return (
        <Fragment>
            <div className='custom-editor'>
                <EditorBlock content={content} setContent={setContent} />
            </div>
        </Fragment >
    )
}
export default Create

Create.getLayout = (page: ReactElement) => {
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