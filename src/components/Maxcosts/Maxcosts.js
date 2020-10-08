import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';
import EditMaxcosts from './EditMaxcosts/EditMaxcosts';
import DeleteBtn from '../generic/DeleteBtn';

import { fetchMaxcosts, deleteMaxcost } from '../../redux/Maxcosts/actions';
import convertDate from '../../utils/convertDate';

import './Maxcosts.scss';

const Maxcosts = ({ value }) => {

  const [curentItem, setCurentItem] = useState('');
  const [closeEditModal, setCloseEditModal] = useState(true);
  const [closeDeleteModal, setCloseDeleteModal] = useState(true);
  const [filteredMaxcosts, setFilteredMaxcosts] = useState([]);

  const dispatch = useDispatch();
  const { error, loading, maxcostsList } = useSelector(({ maxcosts }) => maxcosts);

  const onSearchChange = (search, data) => {
    if (!search) {
      return true;
    } else {
      const result = data.filter(({ maxCost }) => String(maxCost).toLowerCase().includes(search.toLowerCase()));
      setFilteredMaxcosts(result);
    }
  };

  const visibleData = value ? filteredMaxcosts : maxcostsList;
  const deleteItem = (onError, itemId) => dispatch(deleteMaxcost(itemId));

  useEffect(() => {
    dispatch(fetchMaxcosts());
  }, [dispatch]);

  useEffect(() => {
    onSearchChange(value, maxcostsList)
  }, [value, maxcostsList]);

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
        <thead className="thead-block thead-maxcosts" >
          <tr>
            <th>№</th>
            <th>Макс. доля расходов</th>
            <th>Дата начала</th>
            <th>Дата окончания</th>
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
                  <tbody className="tBody-block tBody-maxcosts">
                    {visibleData.map((item, index) => {
                      const { id, maxCost, dateStart, dateStop } = item;
                      return (
                        <tr key={id}>
                          <td>{index + 1}</td>
                          <td>{maxCost}</td>
                          <td>{convertDate(dateStart)}</td>
                          <td>{convertDate(dateStop)}</td>
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
      <EditMaxcosts
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


export default Maxcosts;
