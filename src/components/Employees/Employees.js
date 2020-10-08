import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';
import EditEmployees from './EditEmployees';
import DeleteBtn from '../generic/DeleteBtn';

import { fetchEmployees, deleteEmployee } from '../../redux/Employees/actions';


import './Employees.scss';

const Employees = ({ value }) => {

  const [curentItem, setCurentItem] = useState('');
  const [closeEditModal, setCloseEditModal] = useState(true);
  const [closeDeleteModal, setCloseDeleteModal] = useState(true);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const dispatch = useDispatch();
  const { error, loading, employeesList } = useSelector(({ employees }) => employees);

  const onSearchChange = (search, data) => {
    if (!search) {
      return true;
    } else {
      const result = data.filter(({ fio }) => fio.toLowerCase().includes(search.toLowerCase()));
      setFilteredEmployees(result)
    }
  };

  const visibleData = value ? filteredEmployees : employeesList;
  const deleteItem = (onError, itemId) => dispatch(deleteEmployee(itemId));

  const activeEmployee = (
    <span className='active-employee'>
      активный
    </span>
  )
  const inactiveEmployee = (
    <span className='inactive-employee'>
      неактивный
    </span>
  )

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    onSearchChange(value, employeesList)
  }, [value, employeesList]);

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
          <col />
          <col />
          <col />
        </colgroup>
        <thead className="thead-block thead-employee" >
          <tr>
            <th>№</th>

            <th>ФИО</th>
            <th>Должность</th>
            <th>ОРГ структура</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Статус сотрудника</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="8" className="p-0">
              <div className="table-wrapper table-scroll">
                <table className="table-container">
                  <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <tbody className="tBody-block tBody-employee">
                    {visibleData.map((item, index) => {
                      const { id, fio, jobPosition, orgStructureName, email, phoneNumber1, isActive } = item;
                      return (
                        <tr key={id}>
                          <td>{index + 1}</td>
                          <td>{fio}</td>
                          <td>{jobPosition}</td>
                          <td>{orgStructureName}</td>
                          <td>{email}</td>
                          <td>{phoneNumber1}</td>
                          <td>{isActive ? activeEmployee : inactiveEmployee}</td>
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
      <DeleteBtn
        onDelete={deleteItem}
        togglerModal={closeDeleteModal}
        itemId={curentItem.id}
        onModalClose={(bool) => setCloseDeleteModal(bool)} />

      <EditEmployees
        item={curentItem}
        togglerModal={closeEditModal}
        onModalClose={(bool) => setCloseEditModal(bool)} />
    </>
  )
}


export default Employees;
