import { Fragment, ReactElement, useEffect, useState } from "react";
import RootLayout from "@/layouts/root-layout";
import MainLayout from "@/layouts/main-layout";
import { useQuery } from "@tanstack/react-query";
import docAPI from "@/api/doc";
import { useRouter } from "next/router";
import { Spacer } from "@nextui-org/react";
import EditorBlock from "@/components/shared/EditorBlock";
import Header from "@/components/pages/create/header";
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
      <Spacer y={10} />
      {!getById.isLoading && !isLoading && (
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
