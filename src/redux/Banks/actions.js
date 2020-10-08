import {
  FETCH_BANKS_REQUESTED,
  FETCH_BANKS_SUCCESS,
  FETCH_BANKS_FAILURE,
  ADDETING_BANKS_REQUESTED,
  ADDETING_BANKS_SUCCESS,
  ADDETING_BANKS_FAILURE,
  EDITING_BANKS_REQUESTED,
  EDITING_BANKS_SUCCESS,
  EDITING_BANKS_FAILURE,
  DELETE_BANKS_REQUESTED,
  DELETE_BANKS_SUCCESS,
  DELETE_BANKS_FAILURE,
} from '../types';
import axios from '../../services/axios';
import objectToFormData from '../../utils/objectToFormData';

// Получение реестра банков
const banksRequested = () => {
  return {
    type: FETCH_BANKS_REQUESTED,
  };
};

const banksSuccess = (data) => {
  return {
    type: FETCH_BANKS_SUCCESS,
    data
  };
};

const banksError = (error) => {
  return {
    type: FETCH_BANKS_FAILURE,
    error
  };
};

const fetchBanks = () => {
  return async (dispatch) => {
    dispatch(banksRequested());
    return axios.get(`banks`)
      .then(response => dispatch(banksSuccess(response.data)))
      .catch(error => dispatch(banksError(error.response.data)));
  }
}

// Добавление банка
const addedBankRequested = () => {
  return {
    type: ADDETING_BANKS_REQUESTED,
  }
};

const addedBankSuccess = (data) => {
  return {
    type: ADDETING_BANKS_SUCCESS,
    data,

  }
};

const addedBankError = (error) => {
  return {
    type: ADDETING_BANKS_FAILURE,
    error
  }
};

const addBank = (bankData) => {
  const formData = objectToFormData(bankData);
  return (dispatch) => {
    dispatch(addedBankRequested());
    return axios.post(`bank`, formData)
      .then((response) => {
        dispatch(addedBankSuccess(response.data));
        return 'Успешно добавлен';
      })
      .catch((error) => {
        dispatch(addedBankError(error));
        throw Error;
      });
  }
};


// Редактирование банка
const editBankRequested = () => {
  return {
    type: EDITING_BANKS_REQUESTED,
  }
};

const editBankSuccess = (data) => {
  return {
    type: EDITING_BANKS_SUCCESS,
    data,

  }
};

const editBankFailure = (error) => {
  return {
    type: EDITING_BANKS_FAILURE,
    error
  }
};

const editBank = (bankData) => {
  const formData = objectToFormData(bankData);
  return (dispatch) => {
    dispatch(editBankRequested());
    return axios.put(`bank`, formData)
      .then((response) => {
        dispatch(editBankSuccess(response.data));
        return 'Данные изменены';
      })
      .catch((error) => {
        dispatch(editBankFailure(error));
        throw Error;
      });
  }
};

// Удаление банка
const deleteBankRequested = () => {
  return {
    type: DELETE_BANKS_REQUESTED,
  }
};

const deleteBankSuccess = () => {
  return {
    type: DELETE_BANKS_SUCCESS
  }
};

const deleteBankFailure = (error) => {
  return {
    type: DELETE_BANKS_FAILURE,
    error
  }
};

const deleteBank = (id) => {
  return (dispatch) => {
    dispatch(deleteBankRequested());
    return axios.delete(`bank/${id}`)
      .then((response) => {
        dispatch(deleteBankSuccess());
        if (response.status === 200) {
          dispatch(fetchBanks());
          return 'Успешно удален';
        }
      })
      .catch((error) => {
        dispatch(deleteBankFailure(error));
        throw Error;
      });
  }
};

export { fetchBanks, addBank, editBank, deleteBank };