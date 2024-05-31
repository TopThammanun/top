import { Fragment, ReactElement, useEffect, useState } from "react";
import RootLayout from "@/layouts/root-layout";
import CreatePostLayout from "@/layouts/page/create-post-layout";
import { Spacer } from "@nextui-org/react";
import EditorBlock from "@/components/shared/EditorBlock";
import Header from "@/components/pages/create/header";
import docAPI from "@/api/doc";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { titleAction } from "@/store/reducers/title";

type Props = {};

const Create = (props: Props) => {
  const router = useRouter();
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const id = router.query.id;

  const getDocData = async () => {
    const data = await docAPI.getById(id);
    setContent(data.editorJson);
    dispatch(titleAction.updateState({ title: data.title }));
    return data;
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      getDocData();
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, []);

  return (
    <Fragment>
      {!isLoading && <Header />}
      <Spacer y={10} />
      {!isLoading && (
        <div className="custom-editor">
          <EditorBlock
            content={content}
            setContent={setContent}
            id={params?.id}
            editable={true}
          />
        </div>
      )}
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
