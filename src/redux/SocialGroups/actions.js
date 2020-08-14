import {
  FETCH_SOCIAL_GROUP_REQUESTED,
  FETCH_SOCIAL_GROUP_SUCCESS,
  FETCH_SOCIAL_GROUP_FAILURE
} from '../types';
import axios from '../../services/axios';

const groupRequested = () => {
  return {
    type: FETCH_SOCIAL_GROUP_REQUESTED
  };
};

const groupSuccess = (socialGroups) => {
  return {
    type: FETCH_SOCIAL_GROUP_SUCCESS,
    payload: socialGroups
  };
};

const groupError = (error) => {
  return {
    type: FETCH_SOCIAL_GROUP_FAILURE,
    payload: error
  };
};

const fetchSocialGroups = () => {
  return async (dispatch) => {
    dispatch(groupRequested());
    return axios.get(`socialgroups`)
      .then(response => dispatch(groupSuccess(response.data)))
      .catch(error => dispatch(groupError(error.response.data)));
  }
}

export { fetchSocialGroups };