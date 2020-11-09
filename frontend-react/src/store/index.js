import { combineReducers } from 'redux';

import { candidatesReducer } from './candidate/reducers';
import { 
    authReducer, 
    registerReducer, 
    activateReducer,
    resetReducer,
    changePWDReducer,
} from './auth/reducers';
import { profileReducer } from './profile/reducers';
import { partiesReducer } from './party/reducers';
import { voteReducer } from './vote/reducers';

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

export * from './vote/actions';
export * from './vote/saga';
export * from './vote/api';

const store = combineReducers({
    candidates: candidatesReducer,
    register: registerReducer,
    auth: authReducer,
    profile: profileReducer,
    parties: partiesReducer,
    vote: voteReducer,
    activate: activateReducer,
    reset: resetReducer,
    changepwd: changePWDReducer
});

export default store;
