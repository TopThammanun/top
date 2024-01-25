import React, { useState, useEffect, Fragment } from "react";
import { Button, Modal, ModalBody, ModalContent, useDisclosure, cn } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { createRoot } from "react-dom/client";
import { useDispatch } from "react-redux";

import { Provider as ReduxProvider } from "react-redux";
import store from '@/redux/store';

export type LoaderProps = {
  action : 'inc' | 'dec'
};

const Loader = (props: LoaderProps ) => {
  const {action} = props;
  const dispath = useDispatch()

  useEffect(() => {
    console.log('CAll Loader');
  }, [])
  return(
    <div></div>
  )

};

const CallLoader = ({ action }: LoaderProps) => {
  const div = document.createElement("div");
  document.body.append(document.createElement("div"));
  const root = createRoot(div);
  root.render(
    <ReduxProvider store={store}>
      <Loader action={action}/>
    </ReduxProvider>
  );
};

export default CallLoader;
