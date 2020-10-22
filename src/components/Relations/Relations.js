import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';
import EditRelDependence from './EditRelDependence/EditRelDependence';
import DeleteBtn from '../generic/DeleteBtn';

import { fetchRelDependences, deleteRelation } from '../../redux/Relations/actions';


import './Relations.scss';

const Relations = ({ value }) => {

  const [curentItem, setCurentItem] = useState({});
  const [closeEditModal, setCloseEditModal] = useState(true);
  const [closeDeleteModal, setCloseDeleteModal] = useState(true);
  const [filteredRelations, setFilteredRelations] = useState([]);

  const dispatch = useDispatch();
  const { error, loading, relDependencesList } = useSelector(({ relations }) => relations);

  const onSearchChange = (search, data) => {
    if (!search) {
      return true;
    } else {
      const result = data.filter(({ relation, relationDependences }) => relation.name.toLowerCase().includes(search.toLowerCase()));
      setFilteredRelations(result);
    }
  };

  const visibleData = value ? filteredRelations : relDependencesList;
  const deleteItem = (onError, itemId) => dispatch(deleteRelation(itemId));

  useEffect(() => {
    dispatch(fetchRelDependences());
  }, [dispatch]);

  useEffect(() => {
    onSearchChange(value, relDependencesList)
  }, [value, relDependencesList]);

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
        </colgroup>
        <thead className="thead-block thead-relations" >
          <tr>
            <th>№</th>
            <th>Физическое лицо</th>
            <th>Отношение к физ.лицу</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4" className="p-0">
              <div className="table-wrapper table-scroll">
                <table className="table-container">
                  <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <tbody className="tBody-block tBody-relations">
                    {visibleData.map((item, index) => {
                      const { relation, relationDependences } = item;
                      const { id, name } = relation;
                      const names = relationDependences.map((item) => `${item.name} / `);

                      return (
                        <tr key={id}>
                          <td>{index + 1}</td>
                          <td>{name}</td>
                          <td>{names}</td>
                          <td >
                            <div className="btn-wrapper">
                              <Button className="btn-edit" onClick={() => {
                                setCurentItem({
                                  relation: relation,
                                  relationDependences: relationDependences
                                });
                                setCloseEditModal(false);
                              }}>
                                <FontAwesomeIcon icon={faEdit} />
                              </Button>
                              <Button className="btn-delete" onClick={() => {
                                setCurentItem(relation);
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

      <EditRelDependence
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


export default Relations;
