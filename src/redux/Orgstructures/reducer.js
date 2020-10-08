import {
  FETCH_ORGSTRUCTURES_REQUESTED,
  FETCH_ORGSTRUCTURES_SUCCESS,
  FETCH_ORGSTRUCTURES_FAILURE,
  ADDETING_ORGSTRUCTURES_REQUESTED,
  ADDETING_ORGSTRUCTURES_SUCCESS,
  ADDETING_ORGSTRUCTURES_FAILURE,
  EDITING_ORGSTRUCTURES_REQUESTED,
  EDITING_ORGSTRUCTURES_SUCCESS,
  EDITING_ORGSTRUCTURES_FAILURE,
  DELETE_ORGSTRUCTURES_REQUESTED,
  DELETE_ORGSTRUCTURES_SUCCESS,
  DELETE_ORGSTRUCTURES_FAILURE,
  FETCH_ORGUNITS_REQUESTED,
  FETCH_ORGUNITS_SUCCESS,
  FETCH_ORGUNITS_FAILURE,

} from '../types';

const INIT_STATE = {
  unitsError: null,
  unitsLoading: true,
  orgunitsList: [],

  error: null,
  loading: true,
  orgstructuresList: [],

  adding: false,
  errorAdding: null,
  addedOrgstructures: null,

  editing: false,
  errorEditing: null,
  editOrgstructures: null,

  deletion: false,
  errorDeletion: null,
};

const orgstructuresReducer = (state = INIT_STATE, action) => {

  switch (action.type) {

    // Получение реестра организационных единиц
    case FETCH_ORGUNITS_REQUESTED:
      return {
        ...state,
        unitsError: null,
        unitsLoading: true,
      };
    case FETCH_ORGUNITS_SUCCESS:
      return {
        ...state,
        unitsLoading: false,
        orgunitsList: action.data
      };
    case FETCH_ORGUNITS_FAILURE:
      return {
        ...state,
        unitsError: action.error,
        unitsLoading: false
      };

    // Получение реестра организационных структур
    case FETCH_ORGSTRUCTURES_REQUESTED:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_ORGSTRUCTURES_SUCCESS:
      return {
        ...state,
        loading: false,
        orgstructuresList: action.data
      };
    case FETCH_ORGSTRUCTURES_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    // Добавление организационной структуры
    case ADDETING_ORGSTRUCTURES_REQUESTED:
      return {
        ...state,
        errorAdding: null,
        adding: true,
      };
    case ADDETING_ORGSTRUCTURES_SUCCESS:
      return {
        ...state,
        adding: false,
        addedOrgstructures: action.data
      };
    case ADDETING_ORGSTRUCTURES_FAILURE:
      return {
        ...state,
        errorAdding: action.error,
        adding: false,
      };

    // Изменение организационной структуры
    case EDITING_ORGSTRUCTURES_REQUESTED:
      return {
        ...state,
        errorEditing: null,
        editing: true,
      };
    case EDITING_ORGSTRUCTURES_SUCCESS:
      return {
        ...state,
        editing: false,
        editOrgstructures: action.data
      };
    case EDITING_ORGSTRUCTURES_FAILURE:
      return {
        ...state,
        errorEditing: action.error,
        editing: false,
      };

    // Удаление организационной структуры
    case DELETE_ORGSTRUCTURES_REQUESTED:
      return {
        ...state,
        deletion: true,
        errorDeletion: null
      };
    case DELETE_ORGSTRUCTURES_SUCCESS:
      return {
        ...state,
        deletion: false,
      };
    case DELETE_ORGSTRUCTURES_FAILURE:
      return {
        ...state,
        deletion: false,
        errorDeletion: action.error
      };


    default:
      return state;
  }
};


export { orgstructuresReducer };