import {
  FETCH_SOCIAL_GROUP_REQUESTED,
  FETCH_SOCIAL_GROUP_SUCCESS,
  FETCH_SOCIAL_GROUP_FAILURE
} from '../types';

const initialState = {
  error: null,
  loading: true,
  socialGroups: []
};

const getSocialGroupsReducer = (state = initialState, action) => {

  switch (action.type) {

    case FETCH_SOCIAL_GROUP_REQUESTED:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_SOCIAL_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        socialGroups: action.payload
      };
    case FETCH_SOCIAL_GROUP_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};


export { getSocialGroupsReducer };