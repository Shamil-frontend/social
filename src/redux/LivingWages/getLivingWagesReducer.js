import {
  SET_LIWING_WAGES_ID,
  FETCH_LIVING_WAGES_REQUESTED,
  FETCH_LIVING_WAGES_SUCCESS,
  FETCH_LIVING_WAGES_FAILURE,
  LIVING_WAGES_ADD_REQUESTED,
  LIVING_WAGES_ADD_SUCCESS,
  LIVING_WAGES_ADD_FAILURE,
  LIVING_WAGES_DEL_REQUESTED,
  LIVING_WAGES_DEL_SUCCESS,
  LIVING_WAGES_DEL_FAILURE,
} from '../types';

const INIT_STATE = {
  error: null,
  loading: false,
  allLivingWages: [],
  filteredLivingWages: [],
  id: 1,
  addedLivingWages: null,
  adding: false,
  errorAdding: null,
  deletion: false,
  errorDeletion: null
};

const getLivingWagesReducer = (state = INIT_STATE, action) => {

  switch (action.type) {

    //Установка id
    case SET_LIWING_WAGES_ID:
      return {
        ...state,
        id: action.id
      };

    //Получение данных по прожиточному минимуму
    case FETCH_LIVING_WAGES_REQUESTED:
      return {
        ...state,
        error: null,
        loading: true,
        filteredLivingWages: []
      };
    case FETCH_LIVING_WAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        allLivingWages: action.livingWages,
        // id: action.id
      };
    case FETCH_LIVING_WAGES_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    //Добавление элемента 
    case LIVING_WAGES_ADD_REQUESTED:
      return {
        ...state,
        adding: true,
        errorAdding: null
      };
    case LIVING_WAGES_ADD_SUCCESS:
      return {
        ...state,
        addedLivingWages: action.responseData,
        adding: false
      };
    case LIVING_WAGES_ADD_FAILURE:
      return {
        ...state,
        adding: false,
        errorAdding: action.error
      };

    // Удаление элемента
    case LIVING_WAGES_DEL_REQUESTED:
      return {
        ...state,
        deletion: true,
        errorDeletion: null
      };
    case LIVING_WAGES_DEL_SUCCESS:
      return {
        ...state,
        deletion: false
      };
    case LIVING_WAGES_DEL_FAILURE:
      return {
        ...state,
        deletion: false,
        errorDeletion: action.error
      };

    default:
      return state;
  }
};

export { getLivingWagesReducer };