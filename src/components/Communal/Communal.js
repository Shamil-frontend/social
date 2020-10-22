import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';
// import EditCommunal from './EditCommunal';
import DeleteBtn from '../generic/DeleteBtn';

import { fetchCommunal, deleteCommunal } from '../../redux/Communal/actions';


import './Communal.scss';

const Communal = ({ value }) => {

  const [curentItem, setCurentItem] = useState('');
  // const [closeEditModal, setCloseEditModal] = useState(true);
  const [closeDeleteModal, setCloseDeleteModal] = useState(true);
  const [filteredCommunal, setFilteredCommunal] = useState([]);

  const dispatch = useDispatch();
  const { error, loading, communalList } = useSelector(({ communal }) => communal);

  const onSearchChange = (search, data) => {
    if (!search) {
      return true;
    } else {
      const result = data.filter(({ nameRus }) => nameRus.toLowerCase().includes(search.toLowerCase()));
      setFilteredCommunal(result);
    }
  };


  const visibleData = value ? filteredCommunal : communalList;
  const deleteItem = (onError, itemId) => dispatch(deleteCommunal(itemId));

  useEffect(() => {
    dispatch(fetchCommunal());
  }, [dispatch]);

  useEffect(() => {
    onSearchChange(value, communalList)
  }, [value, communalList]);

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
        <thead className="thead-block thead-communal" >
          <tr>
            <th>№</th>
            <th>Наименование сервиса</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3" className="p-0">
              <div className="table-wrapper table-scroll">
                <table className="table-container">
                  <colgroup>
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <tbody className="tBody-block tBody-communal">
                    {visibleData.map((item, index) => {
                      const { id, serviceName } = item;
                      return (
                        <tr key={id}>
                          <td>{index + 1}</td>
                          <td>{serviceName}</td>
                          <td >
                            <div className="btn-wrapper">
                              {/* <Button className="btn-edit" onClick={() => {
                                setCurentItem(item);
                                setCloseEditModal(false);
                              }}>
                                <FontAwesomeIcon icon={faEdit} />
                              </Button> */}
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
      {/* <EditCommunal
        item={curentItem}
        togglerModal={closeEditModal}
        onModalClose={(bool) => setCloseEditModal(bool)} /> */}

      <DeleteBtn
        onDelete={deleteItem}
        togglerModal={closeDeleteModal}
        itemId={curentItem.id}
        onModalClose={(bool) => setCloseDeleteModal(bool)} />
    </>
  )
}


export default Communal;
