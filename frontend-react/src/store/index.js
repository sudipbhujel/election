import { combineReducers } from 'redux';
import { candidatesReducer } from './candidate.reducer';
import { authReducer } from './auth.reducers';

export * from './candidate.actions';
export * from './candidate.reducer';
export * from './candidate.saga';
export * from './candidate.api';

export * from './auth.actions';
export * from './auth.api';
export * from './auth.reducers';
export * from './auth.saga'

const store = combineReducers({
    candidates: candidatesReducer,
    auth: authReducer,
});

export default store;
