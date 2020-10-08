import {
  FETCH_ADDRESSES_REGIONS_REQUESTED,
  FETCH_ADDRESSES_REGIONS_SUCCESS,
  FETCH_ADDRESSES_REGIONS_FAILURE,
  FETCH_ADDRESSES_CHILDS_REQUESTED,
  FETCH_ADDRESSES_CHILDS_SUCCESS,
  FETCH_ADDRESSES_CHILDS_FAILURE,
  ADDETING_ADDRESSES_CHILDS_REQUESTED,
  ADDETING_ADDRESSES_CHILDS_SUCCESS,
  ADDETING_ADDRESSES_CHILDS_FAILURE,
  EDITING_ADDRESSES_CHILDS_REQUESTED,
  EDITING_ADDRESSES_CHILDS_SUCCESS,
  EDITING_ADDRESSES_CHILDS_FAILURE,
  DELETE_ADDRESSES_CHILDS_REQUESTED,
  DELETE_ADDRESSES_CHILDS_SUCCESS,
  DELETE_ADDRESSES_CHILDS_FAILURE,
} from '../types';
import axios from '../../services/axios';
import objectToFormData from '../../utils/objectToFormData';


// Получение списка адрессов Регионов
const addressesRegRequested = () => {
  return {
    type: FETCH_ADDRESSES_REGIONS_REQUESTED,
  }
};

const addressesRegSuccess = (data) => {
  return {
    type: FETCH_ADDRESSES_REGIONS_SUCCESS,
    data
  }
};

const addressesRegFailure = (error) => {
  return {
    type: FETCH_ADDRESSES_REGIONS_FAILURE,
    error
  }
};

const fetchAddressesReg = () => {
  return (dispatch) => {
    dispatch(addressesRegRequested());
    return axios.get(`addresses/regions`)
      .then((response) => dispatch(addressesRegSuccess(response.data)))
      .catch((error) => dispatch(addressesRegFailure(error)));
  }
};

// Получение дочерних адрессов
const addressesChildsRequested = () => {
  return {
    type: FETCH_ADDRESSES_CHILDS_REQUESTED,
  }
};

const addressesChildsSuccess = (data, addressTypes) => {
  return {
    type: FETCH_ADDRESSES_CHILDS_SUCCESS,
    data,
    addressTypes
  }
};

const addressesChildsFailure = (error) => {
  return {
    type: FETCH_ADDRESSES_CHILDS_FAILURE,
    error
  }
};

const fetchAddressesChilds = (parentId, addressTypes) => {
  return (dispatch) => {
    dispatch(addressesChildsRequested());
    return axios.get(`addresses/childs/${parentId}`)
      .then((response) => dispatch(addressesChildsSuccess(response.data, addressTypes)))
      .catch((error) => dispatch(addressesChildsFailure(error)));
  }
};

// Добавление дочерних адрессов
const addedChildsRequested = () => {
  return {
    type: ADDETING_ADDRESSES_CHILDS_REQUESTED,
  }
};

const addedChildsSuccess = (data) => {
  return {
    type: ADDETING_ADDRESSES_CHILDS_SUCCESS,
    data,

  }
};

const addedChildsFailure = (error) => {
  return {
    type: ADDETING_ADDRESSES_CHILDS_FAILURE,
    error
  }
};

const addAddress = (addressData) => {
  const formData = objectToFormData(addressData);
  return (dispatch) => {
    dispatch(addedChildsRequested());
    return axios.post(`address`, formData)
      .then((response) => {
        dispatch(addedChildsSuccess(response.data));
        return 'Успешно добавлен';
      })
      .catch((error) => {
        dispatch(addedChildsFailure(error));
        throw Error;
      });
  }
};

// Изменение дочерних адрессов
const editChildsRequested = () => {
  return {
    type: EDITING_ADDRESSES_CHILDS_REQUESTED,
  }
};

const editChildsSuccess = (data) => {
  return {
    type: EDITING_ADDRESSES_CHILDS_SUCCESS,
    data,

  }
};

const editChildsFailure = (error) => {
  return {
    type: EDITING_ADDRESSES_CHILDS_FAILURE,
    error
  }
};

const editAddress = (addressData) => {
  const formData = objectToFormData(addressData);
  return (dispatch) => {
    dispatch(editChildsRequested());
    return axios.put(`address`, formData)
      .then((response) => {
        dispatch(editChildsSuccess(response.data));
        return 'Данные изменены';
      })
      .catch((error) => {
        dispatch(editChildsFailure(error));
        throw Error;
      });
  }
};

// Удаление дочерних адрессов
const deleteChildsRequested = () => {
  return {
    type: DELETE_ADDRESSES_CHILDS_REQUESTED,
  }
};

const deleteChildsSuccess = () => {
  return {
    type: DELETE_ADDRESSES_CHILDS_SUCCESS
  }
};

const deleteChildsFailure = (error) => {
  return {
    type: DELETE_ADDRESSES_CHILDS_FAILURE,
    error
  }
};

const deleteAddress = (chilId, parentId, addressTypes) => {
  // console.log(parentId)
  return (dispatch) => {
    dispatch(deleteChildsRequested());
    return axios.delete(`addresses/${chilId}`)
      .then((response) => {
        dispatch(deleteChildsSuccess());
        if (response.status === 200) {
          dispatch(fetchAddressesChilds(parentId, addressTypes));
          return 'Успешно удален';
        }
      })
      .catch((error) => {
        dispatch(deleteChildsFailure(error));
        throw Error;
      });
  }
};


export { fetchAddressesReg, fetchAddressesChilds, addAddress, editAddress, deleteAddress };
