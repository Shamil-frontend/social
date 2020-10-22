import {
  FETCH_ADDRESSES_REGIONS_REQUESTED,
  FETCH_ADDRESSES_REGIONS_SUCCESS,
  FETCH_ADDRESSES_REGIONS_FAILURE,
  FETCH_ADDRESSES_CHILDS_REQUESTED,
  FETCH_ADDRESSES_CHILDS_SUCCESS,
  FETCH_ADDRESSES_CHILDS_FAILURE,
  ADDETING_ADDRESSES_CHILDS_REQUESTED,
  ADDETING_ADDRESSES_CHILDS_SUCCESS,
  ADDETING_ADDRESSES_CHILDS_FAILURE,
  EDITING_ADDRESSES_CHILDS_REQUESTED,
  EDITING_ADDRESSES_CHILDS_SUCCESS,
  EDITING_ADDRESSES_CHILDS_FAILURE,
  DELETE_ADDRESSES_CHILDS_REQUESTED,
  DELETE_ADDRESSES_CHILDS_SUCCESS,
  DELETE_ADDRESSES_CHILDS_FAILURE,
} from '../types';

const INIT_STATE = {
  errorReg: null,
  loadingReg: true,
  regionsList: [],

  errorChilds: null,
  loadingChilds: true,
  cities: [],
  settlements: [],
  streets: [],
  houses: [],
  apartments: [],

  adding: false,
  errorAdding: true,
  addedAddress: null,

  editing: false,
  errorEditing: true,
  editAddress: null,

  deletion: false,
  errorDeletion: null,
};


const addressesReducer = (state = INIT_STATE, action) => {

  switch (action.type) {

    // Получение списка адрессов Регионов
    case FETCH_ADDRESSES_REGIONS_REQUESTED:
      return {
        ...state,
        errorReg: null,
        loadingReg: true
      };
    case FETCH_ADDRESSES_REGIONS_SUCCESS:
      return {
        ...state,
        loadingReg: false,
        regionsList: action.data
      };
    case FETCH_ADDRESSES_REGIONS_FAILURE:
      return {
        ...state,
        loadingReg: false,
        errorReg: action.error,
      };

    // Получение дочерних адрессов
    case FETCH_ADDRESSES_CHILDS_REQUESTED:
      return {
        ...state,
        errorChilds: null,
        loadingChilds: true
      };
    case FETCH_ADDRESSES_CHILDS_SUCCESS: {

      let newState = {
        ...state,
        loadingChilds: false,
        [action.addressTypes]: action.data
      }
      if (action.addressTypes === 'cities') {
        newState.settlements = [];
        newState.streets = [];
        newState.houses = [];
        newState.apartments = [];
      }
      if (action.addressTypes === 'settlements') {
        newState.streets = [];
        newState.houses = [];
        newState.apartments = [];
      }
      if (action.addressTypes === 'streets') {
        newState.houses = [];
        newState.apartments = [];
      }
      if (action.addressTypes === 'houses') {
        newState.apartments = [];
      }
      return newState;
    }
    case FETCH_ADDRESSES_CHILDS_FAILURE:
      return {
        ...state,
        loadingChilds: false,
        errorChilds: action.error,
      };

    // Добавление дочерних адрессов
    case ADDETING_ADDRESSES_CHILDS_REQUESTED:
      return {
        ...state,
        errorAdding: null,
        adding: true,
      };
    case ADDETING_ADDRESSES_CHILDS_SUCCESS:
      return {
        ...state,
        adding: false,
        addedAddress: action.data,
      };
    case ADDETING_ADDRESSES_CHILDS_FAILURE:
      return {
        ...state,
        adding: false,
        errorAdding: action.error,
      };

    // Изменение дочерних адрессов
    case EDITING_ADDRESSES_CHILDS_REQUESTED:
      return {
        ...state,
        errorEditing: null,
        editing: true,
      };
    case EDITING_ADDRESSES_CHILDS_SUCCESS:
      return {
        ...state,
        editing: false,
        editAddress: action.data,
      };
    case EDITING_ADDRESSES_CHILDS_FAILURE:
      return {
        ...state,
        editing: false,
        errorEditing: action.error,
      };

    // Удаление дочерних адрессов
    case DELETE_ADDRESSES_CHILDS_REQUESTED:
      return {
        ...state,
        deletion: true,
        errorDeletion: null
      };
    case DELETE_ADDRESSES_CHILDS_SUCCESS:
      return {
        ...state,
        deletion: false,
      };
    case DELETE_ADDRESSES_CHILDS_FAILURE:
      return {
        ...state,
        deletion: false,
        errorDeletion: action.error
      };



    default:
      return state;
  }
};

export { addressesReducer };