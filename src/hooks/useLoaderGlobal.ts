import { loaderAction } from '@/store/reducers/loader';
import { useDispatch } from 'react-redux';

const useLoaderGlobal = () => {
    const dispatch = useDispatch()

    const start = () => {
        dispatch(loaderAction.startLoader());
    };
    const stop = () => {
        dispatch(loaderAction.stopLoader());
    };

    return {
        start,
        stop,
    };
};

export default useLoaderGlobal;
