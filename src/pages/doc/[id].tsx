import { Fragment, ReactElement, useEffect, useState } from "react";
import RootLayout from "@/layouts/root-layout";
import MainLayout from "@/layouts/main-layout";
import docAPI from "@/api/doc";
import { useRouter } from "next/router";
import { Spacer } from "@nextui-org/react";
import EditorBlock from "@/components/shared/EditorBlock";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { titleAction } from "@/store/reducers/title";

type Props = {};

const Articles = (props: Props) => {
  const router = useRouter();
  const id = router.query.id;
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState([]);
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();

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
      <Spacer y={10} />
      {!isLoading && (
        <div className="flex w-full items-center justify-center">
          <EditorBlock
            content={content}
            setContent={setContent}
            id={params?.id}
            editable={false}
          />
        </div>
      )}
    </Fragment>
  );
};
export default Articles;

Articles.getLayout = (page: ReactElement) => {
  return (
    <Fragment>
      <RootLayout>
        <MainLayout>{page}</MainLayout>
      </RootLayout>
    </Fragment>
  );
};
