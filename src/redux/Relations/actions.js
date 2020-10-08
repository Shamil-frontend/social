import {
  FETCH_RELATIONS_REQUESTED,
  FETCH_RELATIONS_SUCCESS,
  FETCH_RELATIONS_FAILURE,
  FETCH_RELATIONDEPENDENCES_REQUESTED,
  FETCH_RELATIONDEPENDENCES_SUCCESS,
  FETCH_RELATIONDEPENDENCES_FAILURE,
  ADDETING_RELATIONDEPENDENCES_REQUESTED,
  ADDETING_RELATIONDEPENDENCES_SUCCESS,
  ADDETING_RELATIONDEPENDENCES_FAILURE,
  EDITING_RELATIONDEPENDENCES_REQUESTED,
  EDITING_RELATIONDEPENDENCES_SUCCESS,
  EDITING_RELATIONDEPENDENCES_FAILURE,
  DELETE_RELATIONS_REQUESTED,
  DELETE_RELATIONS_SUCCESS,
  DELETE_RELATIONS_FAILURE,
} from '../types';
import axios from '../../services/axios';
import objectToFormData from '../../utils/objectToFormData';


// Получение реестра отношений к ФЛ
const relationsRequested = () => {
  return {
    type: FETCH_RELATIONS_REQUESTED,
  };
};

const relationsSuccess = (data) => {
  return {
    type: FETCH_RELATIONS_SUCCESS,
    data
  };
};

const relationsError = (error) => {
  return {
    type: FETCH_RELATIONS_FAILURE,
    error
  };
};

const fetchRelations = () => {
  return async (dispatch) => {
    dispatch(relationsRequested());
    return axios.get(`relations`)
      .then(response => dispatch(relationsSuccess(response.data)))
      .catch(error => dispatch(relationsError(error.response.data)));
  }
}

// Получение реестра зависимостей
const relationdependencesRequested = () => {
  return {
    type: FETCH_RELATIONDEPENDENCES_REQUESTED,
  };
};

const relationdependencesSuccess = (data) => {
  return {
    type: FETCH_RELATIONDEPENDENCES_SUCCESS,
    data
  };
};

const relationdependencesError = (error) => {
  return {
    type: FETCH_RELATIONDEPENDENCES_FAILURE,
    error
  };
};

const fetchRelDependences = () => {
  return async (dispatch) => {
    dispatch(relationdependencesRequested());
    return axios.get(`relationdependences`)
      .then(response => dispatch(relationdependencesSuccess(response.data)))
      .catch(error => dispatch(relationdependencesError(error.response.data)));
  }
}

// Добавление отношений к ФЛ
const addedRelationdependenceRequested = () => {
  return {
    type: ADDETING_RELATIONDEPENDENCES_REQUESTED,
  }
};

const addedRelationdependenceSuccess = (data) => {
  return {
    type: ADDETING_RELATIONDEPENDENCES_SUCCESS,
    data,

  }
};

const addedRelationdependenceError = (error) => {
  return {
    type: ADDETING_RELATIONDEPENDENCES_FAILURE,
    error
  }
};

const addRelDependence = (relationData) => {
  const formData = objectToFormData(relationData);
  return (dispatch) => {
    dispatch(addedRelationdependenceRequested());
    return axios.post(`relationdependence`, formData)
      .then((response) => {
        dispatch(addedRelationdependenceSuccess(response.data));
        return 'Успешно добавлен';
      })
      .catch((error) => {
        dispatch(addedRelationdependenceError(error));
        throw Error;
      });
  }
};


// Редактирование отношений
const editRelationdependenceRequested = () => {
  return {
    type: EDITING_RELATIONDEPENDENCES_REQUESTED,
  }
};

const editRelationdependenceSuccess = (data) => {
  return {
    type: EDITING_RELATIONDEPENDENCES_SUCCESS,
    data,

  }
};

const editRelationdependenceFailure = (error) => {
  return {
    type: EDITING_RELATIONDEPENDENCES_FAILURE,
    error
  }
};

const editRelDependence = (relationData) => {
  const formData = objectToFormData(relationData);
  return (dispatch) => {
    dispatch(editRelationdependenceRequested());
    return axios.put(`relationdependence`, formData)
      .then((response) => {
        dispatch(editRelationdependenceSuccess(response.data));
        return 'Данные изменены';
      })
      .catch((error) => {
        dispatch(editRelationdependenceFailure(error));
        throw Error;
      });
  }
};

// Удаление отношения
const deleteRelationRequested = () => {
  return {
    type: DELETE_RELATIONS_REQUESTED,
  }
};

const deleteRelationSuccess = () => {
  return {
    type: DELETE_RELATIONS_SUCCESS
  }
};

const deleteRelationFailure = (error) => {
  return {
    type: DELETE_RELATIONS_FAILURE,
    error
  }
};

const deleteRelation = (id) => {
  return (dispatch) => {
    dispatch(deleteRelationRequested());
    return axios.delete(`relation/${id}`)
      .then((response) => {
        dispatch(deleteRelationSuccess());
        if (response.status === 200) {
          dispatch(fetchRelDependences());
          return 'Успешно удален';
        }
      })
      .catch((error) => {
        dispatch(deleteRelationFailure(error));
        throw Error;
      });
  }
};

export { fetchRelations, fetchRelDependences, addRelDependence, editRelDependence, deleteRelation };