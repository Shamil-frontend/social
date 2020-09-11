import {
  FETCH_ADRESSES_REQUESTED,
  FETCH_ADRESSES_SUCCESS,
  FETCH_ADRESSES_FAILURE,
} from '../types';
import axios from '../../services/axios';

const adressesRequested = () => {
  return {
    type: FETCH_ADRESSES_REQUESTED,
  }
};

const adressesSuccess = (data) => {
  return {
    type: FETCH_ADRESSES_SUCCESS,
    data
  }
};

const adressesFailure = (error) => {
  return {
    type: FETCH_ADRESSES_FAILURE,
    error
  }
};

const fetchAdresses = () => {
  return (dispatch) => {
    dispatch(adressesRequested());
    return axios.get(`addresses`)
      .then((response) => dispatch(adressesSuccess(response.data)))
      .catch((error) => dispatch(adressesFailure(error)));
  }
};

export { fetchAdresses };
