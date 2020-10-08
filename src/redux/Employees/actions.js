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
import axios from '../../services/axios';
import objectToFormData from '../../utils/objectToFormData';


// Получение реестра ролей
const rolesRequested = () => {
  return {
    type: FETCH_ROLES_REQUESTED,
  };
};

const rolesSuccess = (data) => {
  return {
    type: FETCH_ROLES_SUCCESS,
    data
  };
};

const rolesError = (error) => {
  return {
    type: FETCH_ROLES_FAILURE,
    error
  };
};

const fetchRoles = () => {
  return async (dispatch) => {
    dispatch(rolesRequested());
    return axios.get(`roles`)
      .then(response => dispatch(rolesSuccess(response.data)))
      .catch(error => dispatch(rolesError(error.response.data)));
  }
}

// Получение реестра сотрудников
const employeesRequested = () => {
  return {
    type: FETCH_EMPLOYEES_REQUESTED,
  };
};

const employeesSuccess = (data) => {
  return {
    type: FETCH_EMPLOYEES_SUCCESS,
    data
  };
};

const employeesError = (error) => {
  return {
    type: FETCH_EMPLOYEES_FAILURE,
    error
  };
};

const fetchEmployees = () => {
  return async (dispatch) => {
    dispatch(employeesRequested());
    return axios.get(`employees`)
      .then(response => dispatch(employeesSuccess(response.data)))
      .catch(error => dispatch(employeesError(error.response.data)));
  }
}

// Добавление нового сотрудника
const addedEmployeeRequested = () => {
  return {
    type: ADDETING_EMPLOYEES_REQUESTED,
  }
};

const addedEmployeeSuccess = (data) => {
  return {
    type: ADDETING_EMPLOYEES_SUCCESS,
    data,

  }
};

const addedEmployeeFailure = (error) => {
  return {
    type: ADDETING_EMPLOYEES_FAILURE,
    error
  }
};

const addEmployee = (employeeData) => {
  const formData = objectToFormData(employeeData);
  return (dispatch) => {
    dispatch(addedEmployeeRequested());
    return axios.post(`employee`, formData)
      .then((response) => {
        dispatch(addedEmployeeSuccess(response.data));
        return 'Успешно добавлен';
      })
      .catch((error) => {
        dispatch(addedEmployeeFailure(error));
        throw Error;
      });
  }
};


// Изменение данных сотрудника
const editEmployeeRequested = () => {
  return {
    type: EDITING_EMPLOYEES_REQUESTED,
  }
};

const editEmployeeSuccess = (data) => {
  return {
    type: EDITING_EMPLOYEES_SUCCESS,
    data,

  }
};

const editEmployeeFailure = (error) => {
  return {
    type: EDITING_EMPLOYEES_FAILURE,
    error
  }
};

const editEmployee = (employeeData) => {
  const formData = objectToFormData(employeeData);
  return (dispatch) => {
    dispatch(editEmployeeRequested());
    return axios.put(`employee`, formData)
      .then((response) => {
        dispatch(editEmployeeSuccess(response.data));
        return 'Данные изменены';
      })
      .catch((error) => {
        dispatch(editEmployeeFailure(error));
        throw Error;
      });
  }
};

// Удаление сотрудника
const deleteEmployeeRequested = () => {
  return {
    type: DELETE_EMPLOYEES_REQUESTED,
  }
};

const deleteEmployeeSuccess = () => {
  return {
    type: DELETE_EMPLOYEES_SUCCESS
  }
};

const deleteEmployeeFailure = (error) => {
  return {
    type: DELETE_EMPLOYEES_FAILURE,
    error
  }
};

const deleteEmployee = (id) => {
  return (dispatch) => {
    dispatch(deleteEmployeeRequested());
    return axios.delete(`employee/${id}`)
      .then((response) => {
        dispatch(deleteEmployeeSuccess());
        if (response.status === 200) {
          dispatch(fetchEmployees());
          return 'Успешно удален';
        }
      })
      .catch((error) => {
        dispatch(deleteEmployeeFailure(error));
        throw Error;
      });
  }
};

export { fetchRoles, fetchEmployees, addEmployee, editEmployee, deleteEmployee };