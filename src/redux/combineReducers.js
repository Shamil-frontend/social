import { combineReducers } from 'redux';

import { getSocialGroupsReducer } from './SocialGroups/reducer';
import { getLivingWagesReducer } from './LivingWages/reducer';
import { getAdressesReducer } from './Adresses/reducer';

const rootReducer = combineReducers({
  getSocialGroups: getSocialGroupsReducer,
  getLivingWages: getLivingWagesReducer,
  getAdresses: getAdressesReducer
});

export default rootReducer;