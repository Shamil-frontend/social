import {
  FETCH_LIVING_WAGES_REQUESTED,
  FETCH_LIVING_WAGES_SUCCESS,
  FETCH_LIVING_WAGES_FAILURE,
  SET_SOCIAL_GROUP_ID,
  GET_LIVING_WAGES_LENGTH
} from '../types';

const initialState = {
  error: null,
  loading: false,
  livingWages: [],
  lengthLivingWages: null,
  id: 1,
  activeButton: 1
};

const getLivingWagesReducer = (state = initialState, action) => {

  switch (action.type) {

    case FETCH_LIVING_WAGES_REQUESTED:
      return {
        ...state,
        error: null,
        loading: true
      };
    case FETCH_LIVING_WAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        livingWages: action.payload
      };
    case FETCH_LIVING_WAGES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SET_SOCIAL_GROUP_ID:
      return {
        ...state,
        id: action.id
      };
    case GET_LIVING_WAGES_LENGTH:
      return {
        ...state,
        lengthLivingWages: action.length
      };
    default:
      return state;
  }
};

export { getLivingWagesReducer };