import {
  SET_LIWING_WAGES_ID,
  FETCH_LIVING_WAGES_REQUESTED,
  FETCH_LIVING_WAGES_SUCCESS,
  FETCH_LIVING_WAGES_FAILURE,
  LIVING_WAGES_ADD_REQUESTED,
  LIVING_WAGES_ADD_SUCCESS,
  LIVING_WAGES_ADD_FAILURE,
  LIVING_WAGES_DEL_REQUESTED,
  LIVING_WAGES_DEL_SUCCESS,
  LIVING_WAGES_DEL_FAILURE,
} from '../types';
import axios from '../../services/axios';
import objectToFormData from '../../utils/objectToFormData';

// Установка id блока данных прожиточного минимума
const setLivingWagesId = (id) => {
  return {
    type: SET_LIWING_WAGES_ID,
    id
  }
};

const setId = (id) => (dispatch) => {
  dispatch(setLivingWagesId(id));
};

// Получение данных по прожиточному минимума
const livingWagesRequested = () => {
  return {
    type: FETCH_LIVING_WAGES_REQUESTED
  }
};

const livingWagesSuccess = (livingWages) => {
  return {
    type: FETCH_LIVING_WAGES_SUCCESS,
    livingWages,
  }
};

const livingWagesFailure = (error) => {
  return {
    type: FETCH_LIVING_WAGES_FAILURE,
    error
  }
};

const fetchLivingWages = (id) => {
  return (dispatch) => {
    dispatch(livingWagesRequested());
    return axios.get(`livingwages/${id}`)
      .then(response => dispatch(livingWagesSuccess(response.data)))
      .catch(error => dispatch(livingWagesFailure(error.response.data)));
  }
};

//Добавление элемента
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

const addLivingWages = (values, socialGroupsId) => {
  console.log("socialGroupsId", socialGroupsId)
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
      return axios.post(`livingwage`, formData)
        .then(response => {
          dispatch(addLivingWagesSuccess(response.data));
          return 'Успешно добавлен';
        })
        .catch(error => {
          dispatch(addLivingWagesFailure(error.response.data));
          throw Error;
        });
    }))
  };
};
// Удаление элемента
const deleteLivingWagesRequested = () => {
  return {
    type: LIVING_WAGES_DEL_REQUESTED
  }
};

const deleteLivingWagesSuccess = () => {
  return {
    type: LIVING_WAGES_DEL_SUCCESS,
  }
};

const deleteLivingWagesFailure = (error) => {
  return {
    type: LIVING_WAGES_DEL_FAILURE,
    error
  }
};

const deleteLivingWages = (itemId, groupId) => {

  return (dispatch) => {
    dispatch(deleteLivingWagesRequested());
    return axios.delete(`livingwage/${itemId}`)
      .then(response => {
        dispatch(deleteLivingWagesSuccess());
        if (response.status === 200) {
          dispatch(fetchLivingWages(groupId));
          return 'Успешно удален';
        }
      })
      .catch(error => {
        dispatch(deleteLivingWagesFailure(error.response.data));
        throw Error;
      });
  }
};

export { setId, fetchLivingWages, addLivingWages, deleteLivingWages };