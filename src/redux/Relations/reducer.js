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

const INIT_STATE = {
  relationsError: null,
  relationsLoading: true,
  relationsList: [],

  error: null,
  loading: true,
  relDependencesList: [],

  adding: false,
  errorAdding: null,
  addedRelationdependence: null,

  editing: false,
  errorEditing: null,
  editRelationdependence: null,

  deletion: false,
  errorDeletion: null,
};

const relationsReducer = (state = INIT_STATE, action) => {

  switch (action.type) {

    // Получение реестра ролей
    case FETCH_RELATIONS_REQUESTED:
      return {
        ...state,
        relationsError: null,
        relationsLoading: true,
      };
    case FETCH_RELATIONS_SUCCESS:
      return {
        ...state,
        relationsLoading: false,
        relationsList: action.data
      };
    case FETCH_RELATIONS_FAILURE:
      return {
        ...state,
        relationsError: action.error,
        relationsLoading: false
      };

    // Получение реестра сотрудников
    case FETCH_RELATIONDEPENDENCES_REQUESTED:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_RELATIONDEPENDENCES_SUCCESS:
      return {
        ...state,
        loading: false,
        relDependencesList: action.data
      };
    case FETCH_RELATIONDEPENDENCES_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    // Добавление нового сотрудника
    case ADDETING_RELATIONDEPENDENCES_REQUESTED:
      return {
        ...state,
        errorAdding: null,
        adding: true,
      };
    case ADDETING_RELATIONDEPENDENCES_SUCCESS:
      return {
        ...state,
        adding: false,
        addedRelationdependence: action.data
      };
    case ADDETING_RELATIONDEPENDENCES_FAILURE:
      return {
        ...state,
        errorAdding: action.error,
        adding: false,
      };

    // Изменение данных сотрудника
    case EDITING_RELATIONDEPENDENCES_REQUESTED:
      return {
        ...state,
        errorEditing: null,
        editing: true,
      };
    case EDITING_RELATIONDEPENDENCES_SUCCESS:
      return {
        ...state,
        editing: false,
        editRelationdependence: action.data
      };
    case EDITING_RELATIONDEPENDENCES_FAILURE:
      return {
        ...state,
        errorEditing: action.error,
        editing: false,
      };

    // Удаление сотрудника
    case DELETE_RELATIONS_REQUESTED:
      return {
        ...state,
        deletion: true,
        errorDeletion: null
      };
    case DELETE_RELATIONS_SUCCESS:
      return {
        ...state,
        deletion: false,
      };
    case DELETE_RELATIONS_FAILURE:
      return {
        ...state,
        deletion: false,
        errorDeletion: action.error
      };

    default:
      return state;
  }
};


export { relationsReducer };