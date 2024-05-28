"use client";
import router from "next/router";
import React, { Fragment, ReactElement, ReactNode, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Icon } from "@iconify/react";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Card,
  Spacer,
  cn,
} from "@nextui-org/react";
import { Image } from "@nextui-org/react";

type MenuItemProps = {
  path: string;
  label: string;
  icon: string;
  leftElement?: ReactNode;
  disablePadding?: boolean;
  disable?: boolean;
};

const MenuItem = (menuItemProps: MenuItemProps) => {
  const active = router.pathname === menuItemProps.path;
  return (
    <div
      className={cn(
        "flex justify-between items-center gap-1 text-sm py-1 rounded-xl transition-all",
        !active && menuItemProps.disable
          ? "text-foreground/60"
          : active
          ? "bg-primary text-primary-foreground"
          : "text-foreground hover:bg-default-200/70 hover:text-default-foreground",
        menuItemProps.disablePadding ? "pl-0" : "px-4",
        menuItemProps.disable ? "cursor-default" : "cursor-pointer hover:pl-6"
      )}
      onClick={() => !menuItemProps.disable && router.push(menuItemProps.path)}
    >
      <div className="flex gap-3 items-center">
        <div className="flex items-center w-fit h-full">
          <Icon icon={menuItemProps.icon} className="w-4 h-4" />
        </div>
        <div>{menuItemProps.label}</div>
      </div>
      {menuItemProps.leftElement && <div>{menuItemProps.leftElement}</div>}
    </div>
  );
};

export const MenuSidebar = () => {
  return (
    <Fragment>
      <Spacer y={4} />
      <div className="flex flex-col gap-2">
        <MenuItem path="#" label="Search" icon="ic:outline-search" />
        <MenuItem path="#" label="Setting" icon="ic:baseline-settings" />
        <MenuItem
          path="#"
          label="Page"
          icon="iconamoon:file-document-duotone"
        />
        <MenuItem path="#" label="Add a page" icon="material-symbols:add" />
      </div>
    </Fragment>
  );
};

const Sidebar = () => {
  return (
    <Card className="max-lg:hidden h-[100dvh] w-[40rem] bg-background transition-all sticky top-0 z-[41] rounded-none dark:border-r">
      <div className="flex gap-3 items-center"></div>
      <PerfectScrollbar className="px-5">
        <MenuSidebar />
      </PerfectScrollbar>
    </Card>
  );
};

export default Sidebar;
