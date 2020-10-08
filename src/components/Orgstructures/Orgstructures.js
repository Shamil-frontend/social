import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';
import EditOrgstucture from './EditOrgstucture/EditOrgstucture';
import DeleteBtn from '../generic/DeleteBtn';

import { fetchOrgstructures, deleteOrgstructure } from '../../redux/Orgstructures/actions';


import './Orgstructures.scss';

const Orgstructures = () => {

  const [curentItem, setCurentItem] = useState('');
  const [closeEditModal, setCloseEditModal] = useState(true);
  const [closeDeleteModal, setCloseDeleteModal] = useState(true);

  const dispatch = useDispatch();
  const { error, loading, orgstructuresList } = useSelector(({ orgstructures }) => orgstructures);


  const deleteItem = (onError, itemId) => dispatch(deleteOrgstructure(itemId));

  useEffect(() => {
    dispatch(fetchOrgstructures())
  }, [dispatch]);

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
        </colgroup>
        <thead className="thead-block thead-org" >
          <tr>
            <th>№</th>
            <th>Подразделение Организации</th>
            <th>Имя Организации</th>
            <th>Адресс</th>
            <th>Email</th>
            <th>Номер</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody >
          <tr>
            <td colSpan="7" className="p-0">
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
                  </colgroup>
                  <tbody className="tBody-block tBody-org">
                    {orgstructuresList.map((item, index) => {
                      const { orgUnitName, name, address, eMail, phoneNumber1, id } = item;
                      return (
                        <tr key={id}>
                          <td>{index + 1}</td>
                          <td>{orgUnitName}</td>
                          <td>{name}</td>
                          <td>{address}</td>
                          <td>{eMail}</td>
                          <td>{phoneNumber1}</td>
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

      <EditOrgstucture
        item={curentItem}
        togglerModal={closeEditModal}
        onModalClose={(bool) => setCloseEditModal(bool)} />
    </>
  )
}


export default Orgstructures;
