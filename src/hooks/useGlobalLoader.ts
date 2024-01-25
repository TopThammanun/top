import { loaderAction } from '@/store/app/loader';
import { useDispatch } from 'react-redux';

const useGlobalLoader = () => {
    const dispatch = useDispatch()

    const start = () => {
        dispatch(loaderAction.startLoader());
    };
    const stop = () => {
        dispatch(loaderAction.startLoader());
    };

    return {
        start,
        stop,
    };
};

export default useGlobalLoader;
