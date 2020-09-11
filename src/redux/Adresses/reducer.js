import {
  FETCH_ADRESSES_REQUESTED,
  FETCH_ADRESSES_SUCCESS,
  FETCH_ADRESSES_FAILURE,
} from '../types';

const INIT_STATE = {
  error: null,
  loading: true,
  data: [],
};

const getAdressesReducer = (state = INIT_STATE, action) => {
  switch (action.type) {

    case FETCH_ADRESSES_REQUESTED:
      return {
        ...state,
        error: null,
        loading: true
      };
    case FETCH_ADRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      };
    case FETCH_ADRESSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export { getAdressesReducer };