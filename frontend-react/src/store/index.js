import { combineReducers } from 'redux';
import { candidatesReducer } from './candidate/reducers';
import { authReducer } from './auth/reducers';
import { profileReducer } from './profile/reducers';

export * from './candidate/actions';
export * from './candidate/saga';
export * from './candidate/api';

export * from './profile/actions';
export * from './profile/saga';
export * from './profile/api';

export * from './auth/actions';
export * from './auth/api';
export * from './auth/saga';

const store = combineReducers({
    candidates: candidatesReducer,
    auth: authReducer,
    profile: profileReducer
});

export default store;
