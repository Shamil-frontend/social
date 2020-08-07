import { combineReducers } from 'redux';

import { getSocialGroupsReducer } from './getSocialGroupsReducer';

const rootReducers = combineReducers({
  getSocialGroups: getSocialGroupsReducer,
});

export default rootReducers;