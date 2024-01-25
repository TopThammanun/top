import { StoreType } from '@/store';
import { loaderAction } from '@/store/app/loader/loader';
import { useDispatch, useSelector } from 'react-redux';

const useGlobalLoader = () => {
    const dispatch = useDispatch()
    const globalState = useSelector((state: StoreType) => state.globalState)

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
