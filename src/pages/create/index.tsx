import { Fragment, ReactElement, useState } from "react";
import RootLayout from "@/layouts/root-layout";
import CreatePostLayout from "@/layouts/page/create-post-layout";
import { Card, CardBody, Spacer } from "@nextui-org/react";
import EditorBlock from "@/components/shared/EditorBlock";
import Header from "@/components/pages/create/header";

type Props = {};

const Create = (props: Props) => {
  const [content, setContent] = useState([]);

  return (
    <Fragment>
      <Header />
      <Spacer y={10} />
      <div className="custom-editor">
        <EditorBlock content={content} setContent={setContent} />
      </div>
    </Fragment>
  );
};
export default Create;

Create.getLayout = (page: ReactElement) => {
  return (
    <Fragment>
      <RootLayout>
        <CreatePostLayout>{page}</CreatePostLayout>
      </RootLayout>
    </Fragment>
  );
};
