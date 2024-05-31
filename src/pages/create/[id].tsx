import { Fragment, ReactElement, useEffect, useState } from "react";
import RootLayout from "@/layouts/root-layout";
import CreatePostLayout from "@/layouts/page/create-post-layout";
import { Card, CardBody, Spacer } from "@nextui-org/react";
import EditorBlock from "@/components/shared/EditorBlock";
import Header from "@/components/pages/create/header";
import { useMutation, useQuery } from "@tanstack/react-query";
import docAPI from "@/api/doc";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/store";
import { titleAction } from "@/store/reducers/title";

type Props = {};

const Create = (props: Props) => {
  const router = useRouter();
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const titleState = useSelector((state: StateType) => state.titleState);
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const id = router.query.id;

  const getById = useQuery({
    queryKey: ["docById", id],
    queryFn: (): Promise<any> => docAPI.getById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (getById.data) {
      try {
        setIsLoading(true);
        setContent(getById.data.editorJson);
        dispatch(titleAction.updateState({ title: getById.data.title }));
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }
  }, [getById.data]);

  return (
    <Fragment>
      {!isLoading && <Header />}
      <Spacer y={10} />
      {!getById.isLoading && !isLoading && (
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
