import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { axiosBase } from ".";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "@/redux/store";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import * as loadingScreenReducer from "@/redux/reducers/loadingScreenReducer";

export const useAxiosLoader = () => {
    const dispatch = useDispatch();
    const loadingScreenReducerData = useSelector((state: ReducerType) => state.loadingScreenReducer)

    const [counter, setCounter] = useState(0);
    const [apiLoading, setAPILoading] = useState({});

    const inc = useCallback((url: string) => {
        // const api = [...apiLoading, url]
        const api = apiLoading
        // setAPILoading(prev => ({...prev, {[url]:''}}))
        setCounter(counter => counter + 1)
    }, [setCounter]);

    const dec = useCallback(() => setCounter(counter => (counter > 0 ? counter - 1 : counter)), [
        setCounter
    ]);

    const handleRejection = (response: AxiosResponse<any, any>) => {

    };

    const interceptors = useMemo(() => ({
        request: (config: InternalAxiosRequestConfig<any>) => {
            // console.log('config', config)
            // if (!config.headers.preventLoader){
            //     if (config.url){
            //         inc(config.url);
            //     }
            //     delete config.headers.preventLoader;
            // }
            console.log('config.headers.isLoadingScreen === true', config.headers.isLoadingScreen === "true")
            if (config.url) {
                if (config.headers.isLoadingScreen === "true") {
                    inc(config.url);
                    delete config.headers.isLoadingScreen;
                }
            }
            return config;
        },
        response: (response: AxiosResponse<any, any>) => {
            dec();

            return response;
        },
        error: (error: any) => {
            dec();
            if (error.response) handleRejection(error.response);

            return Promise.reject(error);
        }
    }), [inc, dec]);

    useEffect(() => {
        // add request interceptors
        const request = axiosBase.interceptors.request.use(interceptors.request, interceptors.error);

        // add response interceptors
        const response = axiosBase.interceptors.response.use(interceptors.response, interceptors.error);

        return () => {
            // remove all intercepts when done
            axiosBase.interceptors.request.eject(request);
            axiosBase.interceptors.request.eject(response);
        };
    }, [interceptors]);

    return [counter > 0];
};

const GlobaAPILoader = () => {
    const [loading] = useAxiosLoader();
    return (
        <Modal
            isOpen={loading}
            isDismissable={false}
            hideCloseButton={true}
            className="bg-transparent border-none shadow-none text-primary"
        >
            <ModalContent className="w-fit ">
                <Icon icon="line-md:loading-twotone-loop" className="w-10 h-10" />
            </ModalContent>
        </Modal>
    )
};

export default GlobaAPILoader;