import {
  FETCH_JOBPOSITIONS_REQUESTED,
  FETCH_JOBPOSITIONS_SUCCESS,
  FETCH_JOBPOSITIONS_FAILURE,
  ADDETING_JOBPOSITIONS_REQUESTED,
  ADDETING_JOBPOSITIONS_SUCCESS,
  ADDETING_JOBPOSITIONS_FAILURE,
  EDITING_JOBPOSITIONS_REQUESTED,
  EDITING_JOBPOSITIONS_SUCCESS,
  EDITING_JOBPOSITIONS_FAILURE,
  DELETE_JOBPOSITIONS_REQUESTED,
  DELETE_JOBPOSITIONS_SUCCESS,
  DELETE_JOBPOSITIONS_FAILURE,
} from '../types';
import axios from '../../services/axios';
import objectToFormData from '../../utils/objectToFormData';

// Получение реестра должностей
const jobpositionsRequested = () => {
  return {
    type: FETCH_JOBPOSITIONS_REQUESTED,
  };
};

const jobpositionsSuccess = (data) => {
  return {
    type: FETCH_JOBPOSITIONS_SUCCESS,
    data
  };
};

const jobpositionsError = (error) => {
  return {
    type: FETCH_JOBPOSITIONS_FAILURE,
    error
  };
};

const fetchJobpositions = () => {
  return async (dispatch) => {
    dispatch(jobpositionsRequested());
    return axios.get(`jobpositions`)
      .then(response => dispatch(jobpositionsSuccess(response.data)))
      .catch(error => dispatch(jobpositionsError(error.response.data)));
  }
}

// Добавление должностей
const addedJobpositionRequested = () => {
  return {
    type: ADDETING_JOBPOSITIONS_REQUESTED,
  }
};

const addedJobpositionSuccess = (data) => {
  return {
    type: ADDETING_JOBPOSITIONS_SUCCESS,
    data,

  }
};

const addedJobpositionFailure = (error) => {
  return {
    type: ADDETING_JOBPOSITIONS_FAILURE,
    error
  }
};

const addJobposition = (jobpositionsData) => {
  const formData = objectToFormData(jobpositionsData);
  return (dispatch) => {
    dispatch(addedJobpositionRequested());
    return axios.post(`jobposition`, formData)
      .then((response) => {
        dispatch(addedJobpositionSuccess(response.data));
        return 'Успешно добавлен';
      })
      .catch((error) => {
        dispatch(addedJobpositionFailure(error));
        throw Error;
      });
  }
};

// Изменение должностей
const editJobpositionRequested = () => {
  return {
    type: EDITING_JOBPOSITIONS_REQUESTED,
  }
};

const editJobpositionSuccess = (data) => {
  return {
    type: EDITING_JOBPOSITIONS_SUCCESS,
    data,

  }
};

const editJobpositionFailure = (error) => {
  return {
    type: EDITING_JOBPOSITIONS_FAILURE,
    error
  }
};

const editJobposition = (jobpositionsData) => {
  const formData = objectToFormData(jobpositionsData);
  return (dispatch) => {
    dispatch(editJobpositionRequested());
    return axios.put(`jobposition`, formData)
      .then((response) => {
        dispatch(editJobpositionSuccess(response.data));
        return 'Данные изменены';
      })
      .catch((error) => {
        dispatch(editJobpositionFailure(error));
        throw Error;
      });
  }
};

// Удаление должностей
const deleteJobpositionRequested = () => {
  return {
    type: DELETE_JOBPOSITIONS_REQUESTED,
  }
};

const deleteJobpositionSuccess = () => {
  return {
    type: DELETE_JOBPOSITIONS_SUCCESS
  }
};

const deleteJobpositionFailure = (error) => {
  return {
    type: DELETE_JOBPOSITIONS_FAILURE,
    error
  }
};

const deleteJobposition = (id) => {
  return (dispatch) => {
    dispatch(deleteJobpositionRequested());
    return axios.delete(`jobposition/${id}`)
      .then((response) => {
        dispatch(deleteJobpositionSuccess());
        if (response.status === 200) {
          dispatch(fetchJobpositions());
          return 'Успешно удален';
        }
      })
      .catch((error) => {
        dispatch(deleteJobpositionFailure(error));
        throw Error;
      });
  }
};

export { fetchJobpositions, addJobposition, editJobposition, deleteJobposition };