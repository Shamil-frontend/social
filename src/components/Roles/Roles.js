import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';
import EditRoles from './EditRoles/EditRoles';
import DeleteBtn from '../generic/DeleteBtn';

import { fetchRoles, deleteRoles } from '../../redux/Roles/actions';


import './Roles.scss';

const Roles = ({ value }) => {

  const [curentItem, setCurentItem] = useState('');
  const [closeEditModal, setCloseEditModal] = useState(true);
  const [closeDeleteModal, setCloseDeleteModal] = useState(true);
  const [filteredRoles, setFilteredRoles] = useState([]);

  const dispatch = useDispatch();
  const { error, loading, rolesList } = useSelector(({ roles }) => roles);

  const onSearchChange = (search, data) => {
    if (!search) {
      return true;
    } else {
      const result = data.filter(({ nameRus }) => nameRus.toLowerCase().includes(search.toLowerCase()));
      setFilteredRoles(result);
    }
  };


  const visibleData = value ? filteredRoles : rolesList;
  const deleteItem = (onError, itemId) => dispatch(deleteRoles(itemId));

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    onSearchChange(value, rolesList)
  }, [value, rolesList]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <>
      <Table hover className="reference-table">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead className="thead-block thead-roles" >
          <tr>
            <th>№</th>
            <th>Наименование роли</th>
            <th>Роль</th>
            <th>Ранг</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="5" className="p-0">
              <div className="table-wrapper table-scroll">
                <table className="table-container">
                  <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <tbody className="tBody-block tBody-roles">
                    {visibleData.map((item, index) => {
                      const { id, name, nameRus, rang } = item;
                      return (
                        <tr key={id}>
                          <td>{index + 1}</td>
                          <td>{nameRus}</td>
                          <td>{name}</td>
                          <td>{rang}</td>
                          <td >
                            <div className="btn-wrapper">
                              <Button className="btn-edit" onClick={() => {
                                setCurentItem(item);
                                setCloseEditModal(false);
                              }}>
                                <FontAwesomeIcon icon={faEdit} />
                              </Button>
                              <Button className="btn-delete" onClick={() => {
                                setCurentItem(item);
                                setCloseDeleteModal(false);
                              }}>
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </Table >
      <EditRoles
        item={curentItem}
        togglerModal={closeEditModal}
        onModalClose={(bool) => setCloseEditModal(bool)} />

      <DeleteBtn
        onDelete={deleteItem}
        togglerModal={closeDeleteModal}
        itemId={curentItem.id}
        onModalClose={(bool) => setCloseDeleteModal(bool)} />
    </>
  )
}


export default Roles;
