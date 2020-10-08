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

// Добавление роли
const addedRoleRequested = () => {
  return {
    type: ADDETING_ROLES_REQUESTED,
  }
};

const addedRoleSuccess = (data) => {
  return {
    type: ADDETING_ROLES_SUCCESS,
    data,

  }
};

const addedRoleError = (error) => {
  return {
    type: ADDETING_ROLES_FAILURE,
    error
  }
};

const addRole = (roleData) => {
  const formData = objectToFormData(roleData);
  return (dispatch) => {
    dispatch(addedRoleRequested());
    return axios.post(`role`, formData)
      .then((response) => {
        dispatch(addedRoleSuccess(response.data));
        return 'Успешно добавлен';
      })
      .catch((error) => {
        dispatch(addedRoleError(error));
        throw Error;
      });
  }
};


// Редактирование роли
const editRoleRequested = () => {
  return {
    type: EDITING_ROLES_REQUESTED,
  }
};

const editRoleSuccess = (data) => {
  return {
    type: EDITING_ROLES_SUCCESS,
    data,

  }
};

const editRoleFailure = (error) => {
  return {
    type: EDITING_ROLES_FAILURE,
    error
  }
};

const editRole = (roleData) => {
  const formData = objectToFormData(roleData);
  return (dispatch) => {
    dispatch(editRoleRequested());
    return axios.put(`role`, formData)
      .then((response) => {
        dispatch(editRoleSuccess(response.data));
        return 'Данные изменены';
      })
      .catch((error) => {
        dispatch(editRoleFailure(error));
        throw Error;
      });
  }
};

// Удаление роли
const deleteRolesRequested = () => {
  return {
    type: DELETE_ROLES_REQUESTED,
  }
};

const deleteRolesSuccess = () => {
  return {
    type: DELETE_ROLES_SUCCESS
  }
};

const deleteRolesFailure = (error) => {
  return {
    type: DELETE_ROLES_FAILURE,
    error
  }
};

const deleteRoles = (id) => {
  return (dispatch) => {
    dispatch(deleteRolesRequested());
    return axios.delete(`roles/${id}`)
      .then((response) => {
        dispatch(deleteRolesSuccess());
        if (response.status === 200) {
          dispatch(fetchRoles());
          return 'Успешно удален';
        }
      })
      .catch((error) => {
        dispatch(deleteRolesFailure(error));
        throw Error;
      });
  }
};

export { fetchRoles, addRole, editRole, deleteRoles };