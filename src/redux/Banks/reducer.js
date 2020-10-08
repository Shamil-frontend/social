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

const INIT_STATE = {
  error: null,
  loading: true,
  banksList: [],

  adding: false,
  errorAdding: null,
  addedBank: null,

  editing: false,
  errorEditing: null,
  editBank: null,

  deletion: false,
  errorDeletion: null,
};

const banksReducer = (state = INIT_STATE, action) => {

  switch (action.type) {

    // Получение реестра банков
    case FETCH_BANKS_REQUESTED:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_BANKS_SUCCESS:
      return {
        ...state,
        loading: false,
        banksList: action.data
      };
    case FETCH_BANKS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    // Добавление банка
    case ADDETING_BANKS_REQUESTED:
      return {
        ...state,
        errorAdding: null,
        adding: true,
      };
    case ADDETING_BANKS_SUCCESS:
      return {
        ...state,
        adding: false,
        addedBank: action.data
      };
    case ADDETING_BANKS_FAILURE:
      return {
        ...state,
        errorAdding: action.error,
        adding: false,
      };

    // Изменение банка
    case EDITING_BANKS_REQUESTED:
      return {
        ...state,
        errorEditing: null,
        editing: true,
      };
    case EDITING_BANKS_SUCCESS:
      return {
        ...state,
        editing: false,
        editBank: action.data
      };
    case EDITING_BANKS_FAILURE:
      return {
        ...state,
        errorEditing: action.error,
        editing: false,
      };

    // Удаление банка
    case DELETE_BANKS_REQUESTED:
      return {
        ...state,
        deletion: true,
        errorDeletion: null
      };
    case DELETE_BANKS_SUCCESS:
      return {
        ...state,
        deletion: false,
      };
    case DELETE_BANKS_FAILURE:
      return {
        ...state,
        deletion: false,
        errorDeletion: action.error
      };

    default:
      return state;
  }
};


export { banksReducer };