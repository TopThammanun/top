import React from "react";
import { Icon } from "@iconify/react";
import CallLoader from "./ShowLoder";

const Loader = {
    start() {
        CallLoader({ action: 'inc' });
    },
    stop() {
        CallLoader({ action: 'dec' });
    },
};

export default Loader;
