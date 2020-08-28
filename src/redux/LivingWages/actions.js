import {
  SET_LIWING_WAGES_ID,
  FETCH_LIVING_WAGES_REQUESTED,
  FETCH_LIVING_WAGES_SUCCESS,
  FETCH_LIVING_WAGES_FAILURE,
  LIVING_WAGES_ADD_REQUESTED,
  LIVING_WAGES_ADD_SUCCESS,
  LIVING_WAGES_ADD_FAILURE
} from '../types';
import axios from '../../services/axios';
import objectToFormData from '../../utils/objectToFormData';

// Установка id таблицы прожиточного минимума
const setLivingWagesId = (id) => {
  return {
    type: SET_LIWING_WAGES_ID,
    id
  }
};

const setId = (id) => (dispatch) => {
  dispatch(setLivingWagesId(id));
};

// Получение таблиц прожиточного минимума
const livingWagesRequested = () => {
  return {
    type: FETCH_LIVING_WAGES_REQUESTED
  }
};

const livingWagesSuccess = (livingWages, id) => {
  return {
    type: FETCH_LIVING_WAGES_SUCCESS,
    livingWages,
    id
  }
};

const livingWagesFailure = (error) => {
  return {
    type: FETCH_LIVING_WAGES_FAILURE,
    error
  }
};

const fetchLivingWages = (id) => {
  return async (dispatch) => {
    dispatch(livingWagesRequested());
    return await axios.get(`livingwages/${id}`)
      .then(response => {
        dispatch(livingWagesSuccess(response.data, id));
      })
      .catch(error => dispatch(livingWagesFailure(error.response.data)));
  }
};

//Добавление элемента в таблицу
const addLivingWagesRequested = () => {
  return {
    type: LIVING_WAGES_ADD_REQUESTED
  }
};

const addLivingWagesSuccess = (responseData) => {
  return {
    type: LIVING_WAGES_ADD_SUCCESS,
    responseData
  }
};

const addLivingWagesFailure = (error) => {
  return {
    type: LIVING_WAGES_ADD_FAILURE,
    error
  }
};

const addLivingWages = (values, socialGroupsId, id) => {
  const array = Object.entries(values)
    .filter((item) => typeof item[1] !== 'object')
    .map(([, value], index) => {
      const { dateStart } = values;
      const itemId = socialGroupsId[index];
      return {
        socialGroupId: itemId.id,
        wageValue: value,
        dateStart
      }
    });

  return (dispatch) => {
    dispatch(addLivingWagesRequested());
    return Promise.all(array.map((item) => {
      const formData = objectToFormData(item);

      console.log("item", item);
      return axios.post(`livingwage`, formData)
        .then(response => {
          dispatch(addLivingWagesSuccess(response.data));
          dispatch(fetchLivingWages(id));
        })
        .catch(error => dispatch(addLivingWagesFailure(error.response.data)));
    }))
  }
};

export { setId, fetchLivingWages, addLivingWages };