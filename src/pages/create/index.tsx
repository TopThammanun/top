import { Fragment, ReactElement, useEffect, useState } from "react";
import RootLayout from "@/layouts/root-layout";
import CreatePostLayout from "@/layouts/page/create-post-layout";
import { Card, CardBody, Spacer } from "@nextui-org/react";
import EditorBlock from "@/components/shared/EditorBlock";
import Header from "@/components/pages/create/header";
import { useMutation, useQuery } from "@tanstack/react-query";
import docAPI from "@/api/doc";

type Props = {};

const Create = (props: Props) => {
  const [content, setContent] = useState([]);
  const getPostAll = useQuery({
    queryKey: ["all"],
    queryFn: (): Promise<any> => docAPI.getAll(),
  });

  useEffect(() => {
    if (getPostAll.data) {
      setContent(getPostAll.data[0].editorJson);
    }
  }, [getPostAll.data]);

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
