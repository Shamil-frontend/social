import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';
import Paginator from '../generic/Paginator/paginator';
import DeleteBtn from '../generic/DeleteBtn';

import convertDate from '../../utils/convertDate';
import { fetchLivingWages, deleteLivingWages } from '../../redux/LivingWages/actions';

import './LivingwagesDetails.scss';

const LivingwagesDetails = ({ values, setNewValues, id }) => {

  const dispatch = useDispatch();

  const {
    allLivingWages,
    loading,
    error
  } = useSelector(({ livingWages }) => livingWages);

  const [page, setPage] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [bool, setBool] = useState(true);
  const [filterlivingWages, setFilteLivingWages] = useState([]);
  const [curentItemId, setCurentItemId] = useState('');
  const [closeDeleteModal, setCloseDeleteModal] = useState(true);

  const groupId = id;
  const pageLimit = 50;
  const portionLimit = 3;

  const visibleArray = values ? filterlivingWages : allLivingWages;

  const onSearchTable = (array, term, limit) => {
    if (!term) {
      setBool(true);
      return true;
    } else {
      const filterArray = array.filter((item) => {
        return String(item.wageValue).startsWith(term);
      });
      filterArray.length <= limit ? setBool(false) : setBool(true);
      setFilteLivingWages(filterArray);
    }
  };

  const showPage = (itemPage, limit, array) => {
    const startIndex = (itemPage - 1) * limit;
    const endIndex = itemPage * limit;
    setPage(array.slice(startIndex, endIndex));
  };

  const deleteItem = (onError, itemId) => dispatch(deleteLivingWages(itemId, groupId));

  useEffect(() => {
    dispatch(fetchLivingWages(id));
    setActivePage(1);
    setNewValues("");
  }, [dispatch, setNewValues, id]);

  useEffect(() => {
    onSearchTable(allLivingWages, values, pageLimit);
    setActivePage(1);
  }, [allLivingWages, values]);

  useEffect(() => {
    showPage(activePage, pageLimit, visibleArray);
  }, [activePage, visibleArray]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <>
      <Row className="m-0 h-100 flex-column flex-nowrap">
        <Table hover className="reference-table">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead className="thead-block thead-livingwage" >
            <tr>
              <th>№</th>
              <th>Прожиточный минимум</th>
              <th>Дата начала</th>
              <th>Дата окончания</th>
              <th>Удаление</th>
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
                    <tbody className="tBody-block tBody-livingwage">
                      {page.length ? (
                        page.map(({ id, wageValue, dateStart, dateStop }, index) => (
                          <tr key={id}>
                            <td>{index + 1}</td>
                            <td>{wageValue}</td>
                            <td>{convertDate(dateStart)}</td>
                            <td>{convertDate(dateStop)}</td>
                            <td >
                              <div className="btn-wrapper">
                                <Button className="btn btn-delete" onClick={() => {
                                  setCurentItemId(id);
                                  setCloseDeleteModal(false)
                                }}>
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>

                              </div>
                            </td>
                          </tr>
                        ))) : (
                          <tr>
                            <td className="text-muted">Ничего не найдено</td>
                          </tr>
                        )}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>

        </Table >
        {bool ?
          <Paginator
            className="pagination-block"
            totalItemsCount={visibleArray.length}
            portionLimit={portionLimit}
            pageLimit={pageLimit}
            activePage={activePage}
            setActivePage={(itemPage) => setActivePage(itemPage)}
          /> :
          null}
      </Row>

      <DeleteBtn
        onDelete={deleteItem}
        itemId={curentItemId}
        togglerModal={closeDeleteModal}
        onModalClose={(bool) => setCloseDeleteModal(bool)} />
    </>
  )
}


export default LivingwagesDetails;
