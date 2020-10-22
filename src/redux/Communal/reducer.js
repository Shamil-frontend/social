import {
  FETCH_SERVICES_COMMUNAL_REQUESTED,
  FETCH_SERVICES_COMMUNAL_SUCCESS,
  FETCH_SERVICES_COMMUNAL_FAILURE,
  ADDETING_SERVICES_COMMUNAL_REQUESTED,
  ADDETING_SERVICES_COMMUNAL_SUCCESS,
  ADDETING_SERVICES_COMMUNAL_FAILURE,
  EDITING_SERVICES_COMMUNAL_REQUESTED,
  EDITING_SERVICES_COMMUNAL_SUCCESS,
  EDITING_SERVICES_COMMUNAL_FAILURE,
  DELETE_SERVICES_COMMUNAL_REQUESTED,
  DELETE_SERVICES_COMMUNAL_SUCCESS,
  DELETE_SERVICES_COMMUNAL_FAILURE,
} from '../types';

const INIT_STATE = {
  error: null,
  loading: true,
  communalList: [],

  adding: false,
  errorAdding: null,
  addedCommunal: null,

  editing: false,
  errorEditing: null,
  editCommunal: null,

  deletion: false,
  errorDeletion: null,
};

const communalReducer = (state = INIT_STATE, action) => {

  switch (action.type) {

    // Получение реестра коммунальных услуг
    case FETCH_SERVICES_COMMUNAL_REQUESTED:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_SERVICES_COMMUNAL_SUCCESS:
      return {
        ...state,
        loading: false,
        communalList: action.data
      };
    case FETCH_SERVICES_COMMUNAL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    // Добавление коммунальной услуги
    case ADDETING_SERVICES_COMMUNAL_REQUESTED:
      return {
        ...state,
        errorAdding: null,
        adding: true,
      };
    case ADDETING_SERVICES_COMMUNAL_SUCCESS:
      return {
        ...state,
        adding: false,
        addedCommunal: action.data
      };
    case ADDETING_SERVICES_COMMUNAL_FAILURE:
      return {
        ...state,
        errorAdding: action.error,
        adding: false,
      };

    // Редактирование коммунальной услуги
    case EDITING_SERVICES_COMMUNAL_REQUESTED:
      return {
        ...state,
        errorEditing: null,
        editing: true,
      };
    case EDITING_SERVICES_COMMUNAL_SUCCESS:
      return {
        ...state,
        editing: false,
        editCommunal: action.data
      };
    case EDITING_SERVICES_COMMUNAL_FAILURE:
      return {
        ...state,
        errorEditing: action.error,
        editing: false,
      };

    // Удаление коммунальной услуги
    case DELETE_SERVICES_COMMUNAL_REQUESTED:
      return {
        ...state,
        deletion: true,
        errorDeletion: null
      };
    case DELETE_SERVICES_COMMUNAL_SUCCESS:
      return {
        ...state,
        deletion: false,
      };
    case DELETE_SERVICES_COMMUNAL_FAILURE:
      return {
        ...state,
        deletion: false,
        errorDeletion: action.error
      };

    default:
      return state;
  }
};


export { communalReducer };