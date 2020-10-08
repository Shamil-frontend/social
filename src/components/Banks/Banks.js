import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';
import EditBanks from './EditBanks/EditBanks';
import DeleteBtn from '../generic/DeleteBtn';

import { fetchBanks, deleteBank } from '../../redux/Banks/actions';


import './Banks.scss';

const Banks = ({ value }) => {

  const [curentItem, setCurentItem] = useState('');
  const [closeEditModal, setCloseEditModal] = useState(true);
  const [closeDeleteModal, setCloseDeleteModal] = useState(true);
  const [filteredBanks, setFilteredBanks] = useState([]);

  const dispatch = useDispatch();
  const { error, loading, banksList } = useSelector(({ banks }) => banks);

  const onSearchChange = (search, data) => {
    if (!search) {
      return true;
    } else {
      const result = data.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));
      setFilteredBanks(result);
    }
  };

  const visibleData = value ? filteredBanks : banksList;
  const deleteItem = (onError, itemId) => dispatch(deleteBank(itemId));

  useEffect(() => {
    dispatch(fetchBanks());
  }, [dispatch]);

  useEffect(() => {
    onSearchChange(value, banksList)
  }, [value, banksList]);

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
        <thead className="thead-block thead-banks" >
          <tr>
            <th>№</th>
            <th>Банк</th>
            <th>Адресс</th>
            <th>Город</th>
            <th>К. счет</th>
            <th>Бик</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
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
                  <tbody className="tBody-block tBody-banks">
                    {visibleData.map((item, index) => {
                      const { id, name, address, city, ks, bik } = item;
                      return (
                        <tr key={id}>
                          <td>{index + 1}</td>
                          <td>{name}</td>
                          <td>{address}</td>
                          <td>{city}</td>
                          <td>{ks}</td>
                          <td>{bik}</td>
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
      <EditBanks
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


export default Banks;
