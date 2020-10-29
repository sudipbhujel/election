import { combineReducers } from 'redux';

import { candidatesReducer } from './candidate/reducers';
import { authReducer, registerReducer } from './auth/reducers';
import { profileReducer } from './profile/reducers';
import { partiesReducer } from './party/reducers';

export * from './candidate/actions';
export * from './candidate/saga';
export * from './candidate/api';

export * from './profile/actions';
export * from './profile/saga';
export * from './profile/api';

export * from './auth/actions';
export * from './auth/api';
export * from './auth/saga';

export * from './party/actions';
export * from './party/saga';
export * from './party/api';

const store = combineReducers({
    candidates: candidatesReducer,
    register: registerReducer,
    auth: authReducer,
    profile: profileReducer,
    parties: partiesReducer
});

export default store;
