import {
  FETCH_SERVICES_COMMUNAL_REQUESTED,
  FETCH_SERVICES_COMMUNAL_SUCCESS,
  FETCH_SERVICES_COMMUNAL_FAILURE,
  ADDETING_SERVICES_COMMUNAL_REQUESTED,
  ADDETING_SERVICES_COMMUNAL_SUCCESS,
  ADDETING_SERVICES_COMMUNAL_FAILURE,
  EDITING_SERVICES_COMMUNAL_REQUESTED,
  EDITING_SERVICES_COMMUNAL_SUCCESS,
  EDITING_SERVICES_COMMUNAL_FAILURE,
  DELETE_SERVICES_COMMUNAL_REQUESTED,
  DELETE_SERVICES_COMMUNAL_SUCCESS,
  DELETE_SERVICES_COMMUNAL_FAILURE,
} from '../types';
import axios from '../../services/axios';
import objectToFormData from '../../utils/objectToFormData';

// Получение реестра коммунальных услуг
const communalRequested = () => {
  return {
    type: FETCH_SERVICES_COMMUNAL_REQUESTED,
  };
};

const communalSuccess = (data) => {
  return {
    type: FETCH_SERVICES_COMMUNAL_SUCCESS,
    data
  };
};

const communalError = (error) => {
  return {
    type: FETCH_SERVICES_COMMUNAL_FAILURE,
    error
  };
};

const fetchCommunal = () => {
  return async (dispatch) => {
    dispatch(communalRequested());
    return axios.get(`servicescommunal`)
      .then(response => dispatch(communalSuccess(response.data)))
      .catch(error => dispatch(communalError(error.response.data)));
  }
}

// Добавление коммунальной услуги
const addedCommunalRequested = () => {
  return {
    type: ADDETING_SERVICES_COMMUNAL_REQUESTED,
  }
};

const addedCommunalSuccess = (data) => {
  return {
    type: ADDETING_SERVICES_COMMUNAL_SUCCESS,
    data,

  }
};

const addedCommunalError = (error) => {
  return {
    type: ADDETING_SERVICES_COMMUNAL_FAILURE,
    error
  }
};

const addCommunal = (roleData) => {
  const formData = objectToFormData(roleData);
  return (dispatch) => {
    dispatch(addedCommunalRequested());
    return axios.post(`servicescommunal`, formData)
      .then((response) => {
        dispatch(addedCommunalSuccess(response.data));
        return 'Успешно добавлен';
      })
      .catch((error) => {
        dispatch(addedCommunalError(error));
        throw Error;
      });
  }
};


// Редактирование коммунальной услуги
const editCommunalRequested = () => {
  return {
    type: EDITING_SERVICES_COMMUNAL_REQUESTED,
  }
};

const editCommunalSuccess = (data) => {
  return {
    type: EDITING_SERVICES_COMMUNAL_SUCCESS,
    data,

  }
};

const editCommunalFailure = (error) => {
  return {
    type: EDITING_SERVICES_COMMUNAL_FAILURE,
    error
  }
};

const editCommunal = (roleData) => {
  const formData = objectToFormData(roleData);
  return (dispatch) => {
    dispatch(editCommunalRequested());
    return axios.put(`servicescommunal`, formData)
      .then((response) => {
        dispatch(editCommunalSuccess(response.data));
        return 'Данные изменены';
      })
      .catch((error) => {
        dispatch(editCommunalFailure(error));
        throw Error;
      });
  }
};

// Удаление коммунальной услуги
const deleteCommunalRequested = () => {
  return {
    type: DELETE_SERVICES_COMMUNAL_REQUESTED,
  }
};

const deleteCommunalSuccess = () => {
  return {
    type: DELETE_SERVICES_COMMUNAL_SUCCESS
  }
};

const deleteCommunalFailure = (error) => {
  return {
    type: DELETE_SERVICES_COMMUNAL_FAILURE,
    error
  }
};

const deleteCommunal = (id) => {
  return (dispatch) => {
    dispatch(deleteCommunalRequested());
    return axios.delete(`servicescommunal/${id}`)
      .then((response) => {
        dispatch(deleteCommunalSuccess());
        if (response.status === 200) {
          dispatch(fetchCommunal());
          return 'Успешно удален';
        }
      })
      .catch((error) => {
        dispatch(deleteCommunalFailure(error));
        throw Error;
      });
  }
};

export { fetchCommunal, addCommunal, editCommunal, deleteCommunal };