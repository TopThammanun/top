import { loaderAction } from '@/store/reducers/loader';
import { useDispatch } from 'react-redux';

const useGlobalLoader = () => {
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

export default useGlobalLoader;
