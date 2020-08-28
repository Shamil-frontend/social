import { combineReducers } from 'redux';

import { getSocialGroupsReducer } from './SocialGroups/getSocialGroupsReducer';
import { getLivingWagesReducer } from './LivingWages/getLivingWagesReducer';

const rootReducer = combineReducers({
  getSocialGroups: getSocialGroupsReducer,
  getLivingWages: getLivingWagesReducer
});

export default rootReducer;