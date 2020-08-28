import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Tab, Table, Form } from 'react-bootstrap';

import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';
import Paginator from '../generic/Paginator/paginator';
import convertDate from '../../utils/convertDate';
import DeleteBtn from '../generic/DeleteBtn';

import extractDate from '../../utils/extractDate';
import { fetchLivingWages } from '../../redux/LivingWages/actions';

const LivingwagesDetails = ({ values, setNewValues }) => {

  const dispatch = useDispatch();

  const {
    allLivingWages,
    loading,
    error,
    id
  } = useSelector(({ getLivingWages }) => getLivingWages);


  const [page, setPage] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [bool, setBool] = useState(true);
  const [filterlivingWages, setFilteLivingWages] = useState([]);

  const pageLimit = 8;
  const portionLimit = 3;

  const visibleArray = values ? filterlivingWages : allLivingWages;

  const onSearchTable = (array, term, pageLimit) => {
    if (!term) {
      setBool(true);
      return true;
    } else {
      const filterArray = array.filter((item) => {
        return String(item.wageValue).startsWith(term);
      });
      filterArray.length <= pageLimit ? setBool(false) : setBool(true);
      setFilteLivingWages(filterArray);
    }
  };

  const showPage = (itemPage, limit, array) => {
    const startIndex = (itemPage - 1) * limit;
    const endIndex = itemPage * limit;
    setPage(array.slice(startIndex, endIndex));
  };

  useEffect(() => {
    dispatch(fetchLivingWages(id));
    setActivePage(1);
    setNewValues("");
  }, [dispatch, id]);

  useEffect(() => {
    onSearchTable(allLivingWages, values, pageLimit)
    setActivePage(1);
  }, [allLivingWages, values, pageLimit]);

  useEffect(() => {
    showPage(activePage, pageLimit, visibleArray)
  }, [activePage, pageLimit, visibleArray]);

  const deleteItem = (comment, onError) => {
    console.log(comment, onError);
  };

  const years = visibleArray.map(({ dateStart }) => extractDate(dateStart, 'year')).sort();
  const months = visibleArray.map(({ dateStart }) => extractDate(dateStart, 'months')).sort();

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <Tab.Content>
      <Tab.Pane eventKey={`socialgroup-${id}`}>
        <Table striped bordered hover>
          <thead className="table-block">
            <tr>
              <th>
                <h5>Сортировка</h5>
              </th>
              <th>
                <Form.Group style={{ margin: '10px' }}>
                  <Form.Label>Выберите год</Form.Label>
                  <Form.Control as="select" size="sm" custom style={{ display: 'block' }}>
                    {years.filter((item, index) => years.indexOf(item) === index).map((year, index) => {
                      return <option key={index} value={year}>{year}</option>
                    })}
                  </Form.Control>
                </Form.Group>
              </th>
              <th>
                <Form.Group style={{ margin: '10px' }}>
                  <Form.Label>Выберите месяц</Form.Label>
                  <Form.Control as="select" size="sm" custom style={{ display: 'block' }}>
                    {months.filter((item, index) => months.indexOf(item) === index).map((month, index) => {
                      return <option key={index} value={month}>{month}</option>
                    })}
                  </Form.Control>
                </Form.Group>
              </th>
            </tr>
            <tr>
              <th>Прожиточный минмум</th>
              <th>Дата начала</th>
              <th>Дата окончания</th>
              <th>Удаление</th>
            </tr>
          </thead>
          <tbody>
            {page.length ? (
              page.map(({ id, wageValue, dateStart, dateStop }) => (
                <tr key={id}>
                  <td>{wageValue}</td>
                  <td>{convertDate(dateStart)}</td>
                  <td>{convertDate(dateStop)}</td>
                  <td >
                    <DeleteBtn onDelete={deleteItem} />
                  </td>
                </tr>
              ))) : (
                <tr>
                  <td className="text-muted">Ничего не найдено</td>
                </tr>
              )}
          </tbody>
        </Table>
        {bool ?
          <Paginator
            totalItemsCount={visibleArray.length}
            portionLimit={portionLimit}
            pageLimit={pageLimit}
            activePage={activePage}
            setActivePage={(itemPage) => setActivePage(itemPage)}
          /> :
          null}
      </Tab.Pane>
    </Tab.Content>
  )
}


export default LivingwagesDetails;
