import {
  FETCH_ROLES_REQUESTED,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_FAILURE,
  ADDETING_ROLES_REQUESTED,
  ADDETING_ROLES_SUCCESS,
  ADDETING_ROLES_FAILURE,
  EDITING_ROLES_REQUESTED,
  EDITING_ROLES_SUCCESS,
  EDITING_ROLES_FAILURE,
  DELETE_ROLES_REQUESTED,
  DELETE_ROLES_SUCCESS,
  DELETE_ROLES_FAILURE,
} from '../types';

const INIT_STATE = {
  error: null,
  loading: true,
  roleList: [],

  adding: false,
  errorAdding: null,
  addedRole: null,

  editing: false,
  errorEditing: null,
  editRole: null,

  deletion: false,
  errorDeletion: null,
};

const rolesReducer = (state = INIT_STATE, action) => {

  switch (action.type) {

    // Получение реестра ролей
    case FETCH_ROLES_REQUESTED:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        roleList: action.data
      };
    case FETCH_ROLES_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    // Добавление роли
    case ADDETING_ROLES_REQUESTED:
      return {
        ...state,
        errorAdding: null,
        adding: true,
      };
    case ADDETING_ROLES_SUCCESS:
      return {
        ...state,
        adding: false,
        addedRole: action.data
      };
    case ADDETING_ROLES_FAILURE:
      return {
        ...state,
        errorAdding: action.error,
        adding: false,
      };

    // Изменение роли
    case EDITING_ROLES_REQUESTED:
      return {
        ...state,
        errorEditing: null,
        editing: true,
      };
    case EDITING_ROLES_SUCCESS:
      return {
        ...state,
        editing: false,
        editRole: action.data
      };
    case EDITING_ROLES_FAILURE:
      return {
        ...state,
        errorEditing: action.error,
        editing: false,
      };

    // Удаление роли
    case DELETE_ROLES_REQUESTED:
      return {
        ...state,
        deletion: true,
        errorDeletion: null
      };
    case DELETE_ROLES_SUCCESS:
      return {
        ...state,
        deletion: false,
      };
    case DELETE_ROLES_FAILURE:
      return {
        ...state,
        deletion: false,
        errorDeletion: action.error
      };

    default:
      return state;
  }
};


export { rolesReducer };