import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';
import EditJobpositions from './EditJobpositions/EditJobpositions';
import DeleteBtn from '../generic/DeleteBtn';

import { fetchJobpositions, deleteJobposition } from '../../redux/Jobpositions/actions';


import './Jobpositions.scss';

const Jobpositions = ({ value }) => {

  const [curentItem, setCurentItem] = useState('');
  const [closeEditModal, setCloseEditModal] = useState(true);
  const [closeDeleteModal, setCloseDeleteModal] = useState(true);
  const [filteredJobpositions, setFilteredJobpositions] = useState([]);

  const dispatch = useDispatch();
  const { error, loading, jobpositionsList } = useSelector(({ jobpositions }) => jobpositions);

  const onSearchChange = (search, data) => {
    if (!search) {
      return true;
    } else {
      const result = data.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));
      setFilteredJobpositions(result)
    }
  };

  const visibleData = value ? filteredJobpositions : jobpositionsList;
  const deleteItem = (onError, itemId) => dispatch(deleteJobposition(itemId));

  useEffect(() => {
    dispatch(fetchJobpositions());
  }, [dispatch]);

  useEffect(() => {
    onSearchChange(value, jobpositionsList)
  }, [value, jobpositionsList]);

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
        </colgroup>
        <thead className="thead-block thead-jobpos" >
          <tr>
            <th>№</th>
            <th>Наименование должности</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody >
          <tr>
            <td colSpan="3" className="p-0">
              <div className="table-wrapper table-scroll">
                <table className="table-container">
                  <colgroup>
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <tbody className="tBody-block tBody-jobpos">
                    {visibleData.map((item, index) => {
                      const { name, id } = item;
                      return (
                        <tr key={id}>
                          <td>{index + 1}</td>
                          <td>{name}</td>
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

      <EditJobpositions
        item={curentItem}
        togglerModal={closeEditModal}
        onModalClose={(bool) => setCloseEditModal(bool)} />
    </>
  )
}


export default Jobpositions;
