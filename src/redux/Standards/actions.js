import {
  FETCH_STANDARD_CATEGORIES_REQUESTED,
  FETCH_STANDARD_CATEGORIES_SUCCESS,
  FETCH_STANDARD_CATEGORIES_FAILURE,
  FETCH_HOUES_TYPES_REQUESTED,
  FETCH_HOUES_TYPES_SUCCESS,
  FETCH_HOUES_TYPES_FAILURE,
  FETCH_STANDARDS_REQUESTED,
  FETCH_STANDARDS_SUCCESS,
  FETCH_STANDARDS_FAILURE,
  ADDETING_STANDARDS_REQUESTED,
  ADDETING_STANDARDS_SUCCESS,
  ADDETING_STANDARDS_FAILURE,
  DELETE_STANDARDS_REQUESTED,
  DELETE_STANDARDS_SUCCESS,
  DELETE_STANDARDS_FAILURE,
} from '../types';
import axios from '../../services/axios';
import objectToFormData from '../../utils/objectToFormData';

// Получение реестра категорий семей
const categoriesRequested = () => {
  return {
    type: FETCH_STANDARD_CATEGORIES_REQUESTED,
  };
};

const categoriesSuccess = (data) => {
  return {
    type: FETCH_STANDARD_CATEGORIES_SUCCESS,
    data
  };
};

const categoriesError = (error) => {
  return {
    type: FETCH_STANDARD_CATEGORIES_FAILURE,
    error
  };
};

const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(categoriesRequested());
    return axios.get(`standardcategories`)
      .then(response => dispatch(categoriesSuccess(response.data)))
      .catch(error => dispatch(categoriesError(error.response.data)));
  }
}

// Получение реестра типов домов
const housetypesRequested = () => {
  return {
    type: FETCH_HOUES_TYPES_REQUESTED,
  };
};

const housetypesSuccess = (data) => {
  return {
    type: FETCH_HOUES_TYPES_SUCCESS,
    data
  };
};

const housetypesError = (error) => {
  return {
    type: FETCH_HOUES_TYPES_FAILURE,
    error
  };
};

const fetchHousetypes = () => {
  return async (dispatch) => {
    dispatch(housetypesRequested());
    return axios.get(`housetypes`)
      .then(response => dispatch(housetypesSuccess(response.data)))
      .catch(error => dispatch(housetypesError(error.response.data)));
  }
}

// Получение реестра стандартов стоимости жилья
const standardsRequested = () => {
  return {
    type: FETCH_STANDARDS_REQUESTED,
  };
};

const standardsSuccess = (data) => {
  return {
    type: FETCH_STANDARDS_SUCCESS,
    data
  };
};

const standardsError = (error) => {
  return {
    type: FETCH_STANDARDS_FAILURE,
    error
  };
};

const fetchStandards = (params) => {
  return async (dispatch) => {
    dispatch(standardsRequested());
    return axios.get(`standards`, { params })
      .then(response => dispatch(standardsSuccess(response.data)))
      .catch(error => dispatch(standardsError(error.response.data)));
  }
}

// Добавление стандарта стоимости жилья
const addedStandardRequested = () => {
  return {
    type: ADDETING_STANDARDS_REQUESTED,
  }
};

const addedStandardSuccess = (data) => {
  return {
    type: ADDETING_STANDARDS_SUCCESS,
    data,

  }
};

const addedStandardError = (error) => {
  return {
    type: ADDETING_STANDARDS_FAILURE,
    error
  }
};

const addStandard = (standardData) => {
  const formData = objectToFormData(standardData);
  return (dispatch) => {
    dispatch(addedStandardRequested());
    return axios.post(`standard`, formData)
      .then((response) => {
        dispatch(addedStandardSuccess(response.data));
        return 'Успешно добавлен';
      })
      .catch((error) => {
        dispatch(addedStandardError(error));
        throw Error;
      });
  }
};


// Удаление стандарта стоимости жилья
const deleteStandardRequested = () => {
  return {
    type: DELETE_STANDARDS_REQUESTED,
  }
};

const deleteStandardSuccess = () => {
  return {
    type: DELETE_STANDARDS_SUCCESS
  }
};

const deleteStandardFailure = (error) => {
  return {
    type: DELETE_STANDARDS_FAILURE,
    error
  }
};

const deleteStandard = (id, standardData) => {

  const defaultCriteriaValue = {
    categoryId: standardData.categoryId.value,
    houseTypeId: standardData.houseTypeId.value,
    seasonId: standardData.seasonId.value,
    addressId: standardData.settlementsId ? standardData.settlementsId.value : standardData.citiesId.value,
  }

  return (dispatch) => {
    dispatch(deleteStandardRequested());
    return axios.delete(`standard/${id}`)
      .then((response) => {
        dispatch(deleteStandardSuccess());
        if (response.status === 200) {
          dispatch(fetchStandards(defaultCriteriaValue));
          return 'Успешно удален';
        }
      })
      .catch((error) => {
        dispatch(deleteStandardFailure(error));
        throw Error;
      });
  }
};

export { fetchCategories, fetchHousetypes, fetchStandards, addStandard, deleteStandard };