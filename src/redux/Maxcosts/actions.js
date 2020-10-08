import {
  FETCH_MAXCOSTS_REQUESTED,
  FETCH_MAXCOSTS_SUCCESS,
  FETCH_MAXCOSTS_FAILURE,
  ADDETING_MAXCOSTS_REQUESTED,
  ADDETING_MAXCOSTS_SUCCESS,
  ADDETING_MAXCOSTS_FAILURE,
  EDITING_MAXCOSTS_REQUESTED,
  EDITING_MAXCOSTS_SUCCESS,
  EDITING_MAXCOSTS_FAILURE,
  DELETE_MAXCOSTS_REQUESTED,
  DELETE_MAXCOSTS_SUCCESS,
  DELETE_MAXCOSTS_FAILURE,
} from '../types';
import axios from '../../services/axios';
import objectToFormData from '../../utils/objectToFormData';

// Получение реестра максимальных долей расходов
const maxcostsRequested = () => {
  return {
    type: FETCH_MAXCOSTS_REQUESTED,
  };
};

const maxcostsSuccess = (data) => {
  return {
    type: FETCH_MAXCOSTS_SUCCESS,
    data
  };
};

const maxcostsError = (error) => {
  return {
    type: FETCH_MAXCOSTS_FAILURE,
    error
  };
};

const fetchMaxcosts = () => {
  return async (dispatch) => {
    dispatch(maxcostsRequested());
    return axios.get(`maxcosts`)
      .then(response => dispatch(maxcostsSuccess(response.data)))
      .catch(error => dispatch(maxcostsError(error.response.data)));
  }
}

// Добавление 
const addedMaxcostRequested = () => {
  return {
    type: ADDETING_MAXCOSTS_REQUESTED,
  }
};

const addedMaxcostSuccess = (data) => {
  return {
    type: ADDETING_MAXCOSTS_SUCCESS,
    data,

  }
};

const addedMaxcostError = (error) => {
  return {
    type: ADDETING_MAXCOSTS_FAILURE,
    error
  }
};

const addMaxcost = (maxcostsData) => {
  const formData = objectToFormData(maxcostsData);
  return (dispatch) => {
    dispatch(addedMaxcostRequested());
    return axios.post(`maxcost`, formData)
      .then((response) => {
        dispatch(addedMaxcostSuccess(response.data));
        return 'Успешно добавлен';
      })
      .catch((error) => {
        dispatch(addedMaxcostError(error));
        throw Error;
      });
  }
};


// Редактирование 
const editMaxcostRequested = () => {
  return {
    type: EDITING_MAXCOSTS_REQUESTED,
  }
};

const editMaxcostSuccess = (data) => {
  return {
    type: EDITING_MAXCOSTS_SUCCESS,
    data,

  }
};

const editMaxcostFailure = (error) => {
  return {
    type: EDITING_MAXCOSTS_FAILURE,
    error
  }
};

const editMaxcost = (maxcostsData) => {
  const formData = objectToFormData(maxcostsData);
  return (dispatch) => {
    dispatch(editMaxcostRequested());
    return axios.put(`maxcost`, formData)
      .then((response) => {
        dispatch(editMaxcostSuccess(response.data));
        return 'Данные изменены';
      })
      .catch((error) => {
        dispatch(editMaxcostFailure(error));
        throw Error;
      });
  }
};

// Удаление 
const deleteMaxcostRequested = () => {
  return {
    type: DELETE_MAXCOSTS_REQUESTED,
  }
};

const deleteMaxcostSuccess = () => {
  return {
    type: DELETE_MAXCOSTS_SUCCESS
  }
};

const deleteMaxcostFailure = (error) => {
  return {
    type: DELETE_MAXCOSTS_FAILURE,
    error
  }
};

const deleteMaxcost = (id) => {
  return (dispatch) => {
    dispatch(deleteMaxcostRequested());
    return axios.delete(`maxcost/${id}`)
      .then((response) => {
        dispatch(deleteMaxcostSuccess());
        if (response.status === 200) {
          dispatch(fetchMaxcosts());
          return 'Успешно удален';
        }
      })
      .catch((error) => {
        dispatch(deleteMaxcostFailure(error));
        throw Error;
      });
  }
};

export { fetchMaxcosts, addMaxcost, editMaxcost, deleteMaxcost };