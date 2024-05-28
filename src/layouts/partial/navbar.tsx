"use client";

import React, { useState, ReactNode } from "react";
import { MenuSidebar } from "./sidebar";
import router from "next/router";
import { Icon } from "@iconify/react";
import { Button, Card, Tooltip } from "@nextui-org/react";
import { Drawer, SwicthThemes } from "@/components/shared";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
type Props = {
  breadcrumb?: ReactNode;
};

const Navbar = (props: Props) => {
  const { breadcrumb } = props;
  const [isOpenToggle, setIsOpenToggle] = useState(false);
  const dispatch = useDispatch();
  const logout = () => {
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-[40]">
      <div className="bg-gradient-to-b from-background from-40% to-background/0 p-6 pt-5 max-md:p-5  max-md:pt-3">
        <Card className="flex flex-row justify-between items-center py-2 px-5">
          <Link
            className="flex justify-center items-center gap-2 cursor-pointer max-lg:hidden"
            href={"/"}
          >
            <Icon icon="tabler:sandbox" className="h-9 w-9" />
            <div className="font-bold">TOP</div>
          </Link>
          <div className="flex items-center gap-5">
            <div className="lg:hidden">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setIsOpenToggle(!isOpenToggle);
                }}
              >
                <Icon icon="lucide:menu" className="h-6 w-6" />
              </div>
              <Drawer
                direction="left"
                open={isOpenToggle}
                onClose={() => {
                  setIsOpenToggle(!isOpenToggle);
                }}
                size={"18rem"}
                className="px-5"
              >
                <MenuSidebar />
              </Drawer>
            </div>
            {breadcrumb && breadcrumb}
          </div>
          <div className="flex items-center lg:gap-10 gap-2">
            <SwicthThemes />
          </div>
        </Card>
      </div>
    </nav>
  );
};

export default Navbar;
