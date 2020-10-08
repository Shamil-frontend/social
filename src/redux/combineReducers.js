import { combineReducers } from 'redux';

import { socialGroupsReducer } from './SocialGroups/reducer';
import { livingWagesReducer } from './LivingWages/reducer';
import { addressesReducer } from './Addresses/reducer';
import { orgstructuresReducer } from './Orgstructures/reducer';
import { jobpositionsReducer } from './Jobpositions/reducer';
import { employeesReducer } from './Employees/reducer';
import { relationsReducer } from './Relations/reducer';
import { rolesReducer } from './Roles/reducer';
import { banksReducer } from './Banks/reducer';
import { maxcostsReducer } from './Maxcosts/reducer';

const rootReducer = combineReducers({
  socialGroups: socialGroupsReducer,
  livingWages: livingWagesReducer,
  addresses: addressesReducer,
  orgstructures: orgstructuresReducer,
  jobpositions: jobpositionsReducer,
  employees: employeesReducer,
  relations: relationsReducer,
  roles: rolesReducer,
  banks: banksReducer,
  maxcosts: maxcostsReducer,

});

export default rootReducer;