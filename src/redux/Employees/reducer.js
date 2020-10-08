import {
  FETCH_EMPLOYEES_REQUESTED,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
  ADDETING_EMPLOYEES_REQUESTED,
  ADDETING_EMPLOYEES_SUCCESS,
  ADDETING_EMPLOYEES_FAILURE,
  EDITING_EMPLOYEES_REQUESTED,
  EDITING_EMPLOYEES_SUCCESS,
  EDITING_EMPLOYEES_FAILURE,
  DELETE_EMPLOYEES_REQUESTED,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_FAILURE,
  FETCH_ROLES_REQUESTED,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_FAILURE,
} from '../types';

const INIT_STATE = {
  rolesError: null,
  rolesLoading: true,
  rolesList: [],

  error: null,
  loading: true,
  employeesList: [],

  adding: false,
  errorAdding: null,
  addedEmployees: null,

  editing: false,
  errorEditing: null,
  editEmployees: null,

  deletion: false,
  errorDeletion: null,
};

const employeesReducer = (state = INIT_STATE, action) => {

  switch (action.type) {

    // Получение реестра ролей
    case FETCH_ROLES_REQUESTED:
      return {
        ...state,
        rolesError: null,
        rolesLoading: true,
      };
    case FETCH_ROLES_SUCCESS:
      return {
        ...state,
        rolesLoading: false,
        rolesList: action.data
      };
    case FETCH_ROLES_FAILURE:
      return {
        ...state,
        rolesError: action.error,
        rolesLoading: false
      };

    // Получение реестра сотрудников
    case FETCH_EMPLOYEES_REQUESTED:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        employeesList: action.data
      };
    case FETCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    // Добавление нового сотрудника
    case ADDETING_EMPLOYEES_REQUESTED:
      return {
        ...state,
        errorAdding: null,
        adding: true,
      };
    case ADDETING_EMPLOYEES_SUCCESS:
      return {
        ...state,
        adding: false,
        addedEmployees: action.data
      };
    case ADDETING_EMPLOYEES_FAILURE:
      return {
        ...state,
        errorAdding: action.error,
        adding: false,
      };

    // Изменение данных сотрудника
    case EDITING_EMPLOYEES_REQUESTED:
      return {
        ...state,
        errorEditing: null,
        editing: true,
      };
    case EDITING_EMPLOYEES_SUCCESS:
      return {
        ...state,
        editing: false,
        editEmployees: action.data
      };
    case EDITING_EMPLOYEES_FAILURE:
      return {
        ...state,
        errorEditing: action.error,
        editing: false,
      };

    // Удаление сотрудника
    case DELETE_EMPLOYEES_REQUESTED:
      return {
        ...state,
        deletion: true,
        errorDeletion: null
      };
    case DELETE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        deletion: false,
      };
    case DELETE_EMPLOYEES_FAILURE:
      return {
        ...state,
        deletion: false,
        errorDeletion: action.error
      };

    default:
      return state;
  }
};


export { employeesReducer };