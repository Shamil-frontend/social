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

const INIT_STATE = {
  error: null,
  loading: true,
  categoriesList: [],

  errorTypes: null,
  loadingTypes: true,
  housetypesList: [],

  errorStandards: null,
  loadingStandards: true,
  standardsList: [],

  adding: false,
  errorAdding: null,
  addedStandard: null,

  deletion: false,
  errorDeletion: null,
};

const standardsReducer = (state = INIT_STATE, action) => {

  switch (action.type) {

    // Получение реестра категорий семей
    case FETCH_STANDARD_CATEGORIES_REQUESTED:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_STANDARD_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categoriesList: action.data
      };
    case FETCH_STANDARD_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    // Получение реестра типов домов
    case FETCH_HOUES_TYPES_REQUESTED:
      return {
        ...state,
        errorTypes: null,
        loadingTypes: true,
      };
    case FETCH_HOUES_TYPES_SUCCESS:
      return {
        ...state,
        loadingTypes: false,
        housetypesList: action.data
      };
    case FETCH_HOUES_TYPES_FAILURE:
      return {
        ...state,
        errorTypes: action.error,
        loadingTypes: false
      };

    // Получение реестра стандартов стоимости жилья
    case FETCH_STANDARDS_REQUESTED:
      return {
        ...state,
        errorStandards: null,
        loadingStandards: true,
      };
    case FETCH_STANDARDS_SUCCESS:
      return {
        ...state,
        loadingStandards: false,
        standardsList: action.data
      };
    case FETCH_STANDARDS_FAILURE:
      return {
        ...state,
        errorStandards: action.error,
        loadingStandards: false
      };

    // Добавление стандарта стоимости жилья
    case ADDETING_STANDARDS_REQUESTED:
      return {
        ...state,
        errorAdding: null,
        adding: true,
      };
    case ADDETING_STANDARDS_SUCCESS:
      return {
        ...state,
        adding: false,
        addedStandard: action.data
      };
    case ADDETING_STANDARDS_FAILURE:
      return {
        ...state,
        errorAdding: action.error,
        adding: false,
      };

    // Удаление роли
    case DELETE_STANDARDS_REQUESTED:
      return {
        ...state,
        deletion: true,
        errorDeletion: null
      };
    case DELETE_STANDARDS_SUCCESS:
      return {
        ...state,
        deletion: false,
      };
    case DELETE_STANDARDS_FAILURE:
      return {
        ...state,
        deletion: false,
        errorDeletion: action.error
      };

    default:
      return state;
  }
};


export { standardsReducer };