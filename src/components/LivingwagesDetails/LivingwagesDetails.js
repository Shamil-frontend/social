import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Tab, Table, Form, Col, Row, ButtonGroup } from 'react-bootstrap';

import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';
import Paginator from '../generic/Paginator/paginator';
import convertDate from '../../utils/convertDate';
import DeleteBtn from '../generic/DeleteBtn';

import extractDate from '../../utils/extractDate';
import { fetchLivingWages } from '../../redux/LivingWages/actions';

import './style.css';

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
  const [pageLimit, setPageLimit] = useState(10);

  const socialgroupId = id;
  const pageLimits = [10, 15, 20];
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

  const onChangeSelect = (evt) => {
    setPageLimit(evt.target.value);
  };

  useEffect(() => {
    dispatch(fetchLivingWages(id));
    setActivePage(1);
    setNewValues("");
    setPageLimit(10);
  }, [dispatch, id]);

  useEffect(() => {
    onSearchTable(allLivingWages, values, pageLimit);
    setActivePage(1);
  }, [allLivingWages, values, pageLimit]);

  useEffect(() => {
    showPage(activePage, pageLimit, visibleArray);
  }, [activePage, pageLimit, visibleArray]);

  const deleteItem = (onError) => {
    console.log(onError);
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
      <Tab.Pane eventKey={`socialgroup-${id}`} className="tab-pane">
        <Table striped bordered hover className="data-table">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead className="thead-block" >
            <tr>
              <th>
                <h5>Сортировка</h5>
              </th>
              <th>
                <Form.Group style={{ margin: '10px' }}>
                  <Form.Label></Form.Label>
                  <Form.Control as="select" size="sm" custom style={{ display: 'block' }}>
                    <option disabled >Год</option>
                    {years.filter((item, index) => years.indexOf(item) === index).map((year, index) => {
                      return <option key={index} value={year}>{year}</option>
                    })}
                  </Form.Control>
                </Form.Group>
              </th>
              <th>
                <Form.Group style={{ margin: '10px' }}>
                  <Form.Label></Form.Label>
                  <Form.Control as="select" size="sm" custom style={{ display: 'block' }} >
                    <option disabled >Месяц</option>
                    {months.filter((item, index) => months.indexOf(item) === index).map((month, index) => {
                      return <option key={index} value={month}>{month}</option>
                    })}
                  </Form.Control>
                </Form.Group>
              </th>
              <th rowSpan="2"></th>
            </tr >
            <tr>
              <th>Прожиточный минмум</th>
              <th>Дата начала</th>
              <th>Дата окончания</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" className="p-0">
                <div className="table-wrapper">
                  <table className="table-container">
                    <colgroup>
                      <col />
                      <col />
                      <col />
                      <col />
                    </colgroup>
                    <tbody className="tBody-block">
                      {page.length ? (
                        page.map(({ id, wageValue, dateStart, dateStop }) => (
                          <tr key={id}>
                            <td>{wageValue}</td>
                            <td>{convertDate(dateStart)}</td>
                            <td>{convertDate(dateStop)}</td>
                            <td >
                              <ButtonGroup className="float-right">
                                <DeleteBtn onDelete={deleteItem} itemId={id} groupId={socialgroupId} />
                              </ButtonGroup>
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
        <Row style={{ justifyContent: "space-between" }} className="pt-2 pb-2 search-block">
          <Col >
            {bool ?
              <Paginator
                totalItemsCount={visibleArray.length}
                portionLimit={portionLimit}
                pageLimit={pageLimit}
                activePage={activePage}
                setActivePage={(itemPage) => setActivePage(itemPage)}
              /> :
              null}
          </Col>
          <Col>
            <Form.Group className="mb-0" style={{ display: 'flex', justifyContent: "flex-end" }}>
              <Form.Label style={{ margin: "0", marginRight: "10px", fontSize: "18px" }}>Number of lines</Form.Label>
              <Form.Control as="select" onChange={(evt) => onChangeSelect(evt)} size="sm" custom style={{ display: 'block', width: "30%", fontSize: "15px" }}>
                {pageLimits.map((item, index) => {
                  return <option key={index} value={item}>{item}</option>
                })}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Tab.Pane >
    </Tab.Content >
  )
}


export default LivingwagesDetails;
