import { Fragment, ReactElement } from "react";
import RootLayout from "@/layouts/root-layout";
import MainLayout from "@/layouts/main-layout";
import { useQuery } from "@tanstack/react-query";
import docAPI from "@/api/doc";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/router";

type Props = {};

const Articles = (props: Props) => {
  const router = useRouter();
  const getPostAll = useQuery({
    queryKey: ["allPost"],
    queryFn: (): Promise<any> => docAPI.getAll(),
  });

  return (
    <Fragment>
      <div className="mx-auto max-md:mx-4 mt-10 space-y-4 max-w-screen-md">
        <h1 className="text-3xl font-bold">Example Docs</h1>
        <div className="text-left flex justify-start">
          {getPostAll.data?.map((result: any) => {
            return (
              <div
                className="border p-4 rounded-lg mb-4 w-[40rem] cursor-pointer"
                key={result.id}
                onClick={() => router.push(`/doc/${result.id}`)}
              >
                <div className="flex items-center mb-2">
                  <div className="flex flex-col gap-2">
                    <div className="text-xl font-semibold">{result.title}</div>
                    <div className="text-xs text-gray-500">
                      {`this is example display form Tiptap "Can Click !"`}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
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
