"use client";

import React, { Fragment, ReactNode } from "react";
import Navbar from "./partial/navbar";
import Footer from "./partial/footer";
import Sidebar from "./partial/sidebar";

type Props = {
  children: ReactNode;
  breadcrumb?: ReactNode;
};

const MainLayout = (props: Props) => {
  const { breadcrumb } = props;

  return (
    <Fragment>
      <div className="flex flex-col h-[100dvh] w-screen">{props.children}</div>
    </Fragment>
  );
};

export default MainLayout;
