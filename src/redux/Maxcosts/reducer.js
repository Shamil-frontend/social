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

const INIT_STATE = {
  error: null,
  loading: true,
  maxcostsList: [],

  adding: false,
  errorAdding: null,
  addedMaxcosts: null,

  editing: false,
  errorEditing: null,
  editMaxcosts: null,

  deletion: false,
  errorDeletion: null,
};

const maxcostsReducer = (state = INIT_STATE, action) => {

  switch (action.type) {

    // Получение реестра максимальных долей расходов
    case FETCH_MAXCOSTS_REQUESTED:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_MAXCOSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        maxcostsList: action.data
      };
    case FETCH_MAXCOSTS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    // Добавление 
    case ADDETING_MAXCOSTS_REQUESTED:
      return {
        ...state,
        errorAdding: null,
        adding: true,
      };
    case ADDETING_MAXCOSTS_SUCCESS:
      return {
        ...state,
        adding: false,
        addedMaxcosts: action.data
      };
    case ADDETING_MAXCOSTS_FAILURE:
      return {
        ...state,
        errorAdding: action.error,
        adding: false,
      };

    // Изменение 
    case EDITING_MAXCOSTS_REQUESTED:
      return {
        ...state,
        errorEditing: null,
        editing: true,
      };
    case EDITING_MAXCOSTS_SUCCESS:
      return {
        ...state,
        editing: false,
        editMaxcosts: action.data
      };
    case EDITING_MAXCOSTS_FAILURE:
      return {
        ...state,
        errorEditing: action.error,
        editing: false,
      };

    // Удаление 
    case DELETE_MAXCOSTS_REQUESTED:
      return {
        ...state,
        deletion: true,
        errorDeletion: null
      };
    case DELETE_MAXCOSTS_SUCCESS:
      return {
        ...state,
        deletion: false,
      };
    case DELETE_MAXCOSTS_FAILURE:
      return {
        ...state,
        deletion: false,
        errorDeletion: action.error
      };

    default:
      return state;
  }
};


export { maxcostsReducer };