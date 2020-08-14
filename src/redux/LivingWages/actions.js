import {
  FETCH_LIVING_WAGES_REQUESTED,
  FETCH_LIVING_WAGES_SUCCESS,
  FETCH_LIVING_WAGES_FAILURE,
  SET_SOCIAL_GROUP_ID,
  GET_LIVING_WAGES_LENGTH
} from '../types';
import axios from '../../services/axios';

const livingWagesRequested = () => {
  return {
    type: FETCH_LIVING_WAGES_REQUESTED
  }
};

const livingWagesSuccess = (livingWages) => {
  return {
    type: FETCH_LIVING_WAGES_SUCCESS,
    payload: livingWages
  }
};

const livingWagesFailure = (error) => {
  return {
    type: FETCH_LIVING_WAGES_FAILURE,
    payload: error
  }
};

const setIdGroup = (id) => {
  return {
    type: SET_SOCIAL_GROUP_ID,
    id
  }
}

const getLength = (length) => {
  return {
    type: GET_LIVING_WAGES_LENGTH,
    length
  }
}


const fetchLivingWages = (id) => {
  return async (dispatch) => {
    dispatch(livingWagesRequested());
    return axios.get(`livingwages/${id}`)
      .then(response => {
        dispatch(livingWagesSuccess(response.data));
        dispatch(setIdGroup(id));
        dispatch(getLength(response.data.length));
      })
      .catch(error => dispatch(livingWagesFailure(error.response.data)));
  }
};

export { fetchLivingWages };