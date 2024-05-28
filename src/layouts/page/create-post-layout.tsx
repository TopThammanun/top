"use client";

import React, { Fragment, ReactNode } from "react";
import Navbar from "../partial/navbar";
import Footer from "../partial/footer";
import Sidebar from "../partial/sidebar";

type Props = {
  children: ReactNode;
  breadcrumb?: ReactNode;
};

const CreatePostLayout = (props: Props) => {
  const { breadcrumb } = props;

  return (
    <Fragment>
      <div className="flex flex-row  max-w-screen">
        <Sidebar />
        <div className="w-full lg:w-[calc(100vw-16rem)]">
          <div className="flex flex-col">
            <div className="flex-grow">
              <div className="pb-6 max-md:pb-5">{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreatePostLayout;
