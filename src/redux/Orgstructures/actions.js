import {
  FETCH_ORGSTRUCTURES_REQUESTED,
  FETCH_ORGSTRUCTURES_SUCCESS,
  FETCH_ORGSTRUCTURES_FAILURE,
  ADDETING_ORGSTRUCTURES_REQUESTED,
  ADDETING_ORGSTRUCTURES_SUCCESS,
  ADDETING_ORGSTRUCTURES_FAILURE,
  EDITING_ORGSTRUCTURES_REQUESTED,
  EDITING_ORGSTRUCTURES_SUCCESS,
  EDITING_ORGSTRUCTURES_FAILURE,
  DELETE_ORGSTRUCTURES_REQUESTED,
  DELETE_ORGSTRUCTURES_SUCCESS,
  DELETE_ORGSTRUCTURES_FAILURE,
  FETCH_ORGUNITS_REQUESTED,
  FETCH_ORGUNITS_SUCCESS,
  FETCH_ORGUNITS_FAILURE,
} from '../types';
import axios from '../../services/axios';
import objectToFormData from '../../utils/objectToFormData';


// Получение реестра организационных единиц
const orgunitsRequested = () => {
  return {
    type: FETCH_ORGUNITS_REQUESTED,
  };
};

const orgunitsSuccess = (data) => {
  return {
    type: FETCH_ORGUNITS_SUCCESS,
    data
  };
};

const orgunitsError = (error) => {
  return {
    type: FETCH_ORGUNITS_FAILURE,
    error
  };
};

const fetchOrgunits = () => {
  return async (dispatch) => {
    dispatch(orgunitsRequested());
    return axios.get(`orgunits`)
      .then(response => dispatch(orgunitsSuccess(response.data)))
      .catch(error => dispatch(orgunitsError(error.response.data)));
  }
}


// Получение реестра организационных структур
const orgstructuresRequested = () => {
  return {
    type: FETCH_ORGSTRUCTURES_REQUESTED,
  };
};

const orgstructuresSuccess = (data) => {
  return {
    type: FETCH_ORGSTRUCTURES_SUCCESS,
    data
  };
};

const orgstructuresError = (error) => {
  return {
    type: FETCH_ORGSTRUCTURES_FAILURE,
    error
  };
};

const fetchOrgstructures = () => {
  return async (dispatch) => {
    dispatch(orgstructuresRequested());
    return axios.get(`orgstructures`)
      .then(response => dispatch(orgstructuresSuccess(response.data)))
      .catch(error => dispatch(orgstructuresError(error.response.data)));
  }
}

// Добавление организационной структуры
const addedOrgstructureRequested = () => {
  return {
    type: ADDETING_ORGSTRUCTURES_REQUESTED,
  }
};

const addedOrgstructureSuccess = (data) => {
  return {
    type: ADDETING_ORGSTRUCTURES_SUCCESS,
    data,

  }
};

const addedOrgstructureFailure = (error) => {
  return {
    type: ADDETING_ORGSTRUCTURES_FAILURE,
    error
  }
};

const addOrgstructure = (orgstructureData) => {
  const formData = objectToFormData(orgstructureData);
  return (dispatch) => {
    dispatch(addedOrgstructureRequested());
    return axios.post(`orgstructure`, formData)
      .then((response) => {
        dispatch(addedOrgstructureSuccess(response.data));
        return 'Успешно добавлен';
      })
      .catch((error) => {
        dispatch(addedOrgstructureFailure(error));
        throw Error;
      });
  }
};

// Изменение организационной структуры
const editOrgstructureRequested = () => {
  return {
    type: EDITING_ORGSTRUCTURES_REQUESTED,
  }
};

const editOrgstructureuccess = (data) => {
  return {
    type: EDITING_ORGSTRUCTURES_SUCCESS,
    data,

  }
};

const editOrgstructureFailure = (error) => {
  return {
    type: EDITING_ORGSTRUCTURES_FAILURE,
    error
  }
};

const editOrgstructure = (orgstructureData) => {
  const formData = objectToFormData(orgstructureData);
  return (dispatch) => {
    dispatch(editOrgstructureRequested());
    return axios.put(`orgstructure`, formData)
      .then((response) => {
        dispatch(editOrgstructureuccess(response.data));
        return 'Данные изменены';
      })
      .catch((error) => {
        dispatch(editOrgstructureFailure(error));
        throw Error;
      });
  }
};

// Удаление организационной структуры
const deleteOrgstructureRequested = () => {
  return {
    type: DELETE_ORGSTRUCTURES_REQUESTED,
  }
};

const deleteOrgstructureuccess = () => {
  return {
    type: DELETE_ORGSTRUCTURES_SUCCESS
  }
};

const deleteOrgstructureFailure = (error) => {
  return {
    type: DELETE_ORGSTRUCTURES_FAILURE,
    error
  }
};

const deleteOrgstructure = (id) => {
  return (dispatch) => {
    dispatch(deleteOrgstructureRequested());
    return axios.delete(`orgstructure/${id}`)
      .then((response) => {
        dispatch(deleteOrgstructureuccess());
        if (response.status === 200) {
          dispatch(fetchOrgstructures());
          return 'Успешно удален';
        }
      })
      .catch((error) => {
        dispatch(deleteOrgstructureFailure(error));
        throw Error;
      });
  }
};

export { fetchOrgunits, fetchOrgstructures, addOrgstructure, editOrgstructure, deleteOrgstructure };