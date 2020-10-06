import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    requestLoginAction
} from '../store';

function useAuths() {
    const dispatch = useDispatch();

    return {
        // user: useSelector((state) => state.user.data),
        // error: useSelector((state) => state.user.error),
        addAuthToken: (creds) => dispatch(requestLoginAction(creds)),
    };
}

export default useAuths;
