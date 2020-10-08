import {
  FETCH_JOBPOSITIONS_REQUESTED,
  FETCH_JOBPOSITIONS_SUCCESS,
  FETCH_JOBPOSITIONS_FAILURE,
  ADDETING_JOBPOSITIONS_REQUESTED,
  ADDETING_JOBPOSITIONS_SUCCESS,
  ADDETING_JOBPOSITIONS_FAILURE,
  EDITING_JOBPOSITIONS_REQUESTED,
  EDITING_JOBPOSITIONS_SUCCESS,
  EDITING_JOBPOSITIONS_FAILURE,
  DELETE_JOBPOSITIONS_REQUESTED,
  DELETE_JOBPOSITIONS_SUCCESS,
  DELETE_JOBPOSITIONS_FAILURE,

} from '../types';

const INIT_STATE = {
  error: null,
  loading: true,
  jobpositionsList: [],

  adding: false,
  errorAdding: null,
  addedJobpositions: null,

  editing: false,
  errorEditing: null,
  editJobpositions: null,

  deletion: false,
  errorDeletion: null,
};

const jobpositionsReducer = (state = INIT_STATE, action) => {

  switch (action.type) {

    // Получение реестра организационных структур
    case FETCH_JOBPOSITIONS_REQUESTED:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_JOBPOSITIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        jobpositionsList: action.data
      };
    case FETCH_JOBPOSITIONS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    // Добавление организационной структуры
    case ADDETING_JOBPOSITIONS_REQUESTED:
      return {
        ...state,
        errorAdding: null,
        adding: true,
      };
    case ADDETING_JOBPOSITIONS_SUCCESS:
      return {
        ...state,
        adding: false,
        addedJobpositions: action.data
      };
    case ADDETING_JOBPOSITIONS_FAILURE:
      return {
        ...state,
        errorAdding: action.error,
        adding: false,
      };

    // Изменение организационной структуры
    case EDITING_JOBPOSITIONS_REQUESTED:
      return {
        ...state,
        errorEditing: null,
        editing: true,
      };
    case EDITING_JOBPOSITIONS_SUCCESS:
      return {
        ...state,
        editing: false,
        editJobpositions: action.data
      };
    case EDITING_JOBPOSITIONS_FAILURE:
      return {
        ...state,
        errorEditing: action.error,
        editing: false,
      };

    // Удаление организационной структуры
    case DELETE_JOBPOSITIONS_REQUESTED:
      return {
        ...state,
        deletion: true,
        errorDeletion: null
      };
    case DELETE_JOBPOSITIONS_SUCCESS:
      return {
        ...state,
        deletion: false,
      };
    case DELETE_JOBPOSITIONS_FAILURE:
      return {
        ...state,
        deletion: false,
        errorDeletion: action.error
      };


    default:
      return state;
  }
};


export { jobpositionsReducer };