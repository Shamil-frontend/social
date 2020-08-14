import { combineReducers } from 'redux';

import { getSocialGroupsReducer } from './SocialGroups/getSocialGroupsReducer';
import { getLivingWagesReducer } from './LivingWages/getLivingWagesReducer';

const rootReducers = combineReducers({
  getSocialGroups: getSocialGroupsReducer,
  getLivingWages: getLivingWagesReducer
});

export default rootReducers;