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
import { statsReducer } from './stats/reducers';
import { stateReducer } from './state/reducers';

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

export * from './stats/actions';
export * from './stats/saga';
export * from './stats/api';

export * from './state/actions';
export * from './state/saga';
export * from './state/api';

const store = combineReducers({
    candidates: candidatesReducer,
    register: registerReducer,
    auth: authReducer,
    profile: profileReducer,
    parties: partiesReducer,
    vote: voteReducer,
    activate: activateReducer,
    reset: resetReducer,
    changepwd: changePWDReducer,
    stats: statsReducer,
    state: stateReducer,
});

export default store;
