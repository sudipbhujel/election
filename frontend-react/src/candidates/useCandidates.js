import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    loadCandidatesAction
} from '../store';

function useCandidates() {
    const dispatch = useDispatch();

    return {
        candidates: useSelector((state) => state.candidates.data),
        error: useSelector((state) => state.candidates.error),
        getCandidates: useCallback(() => dispatch(loadCandidatesAction()), [dispatch]),
    };
}

export default useCandidates;
