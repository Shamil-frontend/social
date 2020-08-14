import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import ReactDom from 'react-dom';
import { Col, Tab, Table } from 'react-bootstrap';

import LoadingIdicator from './generic/Loadingindicator';
import ErrorIndicator from './generic/Errorindicator';
import Paginator from './paginator';
import { convertDate } from '../utils/extractDate';

const LivingwagesDetails = () => {

  const {
    livingWages,
    loading,
    error,
    lengthLivingWages,
    id
  } = useSelector(({ getLivingWages }) => getLivingWages);

  const [arrLivingWages, setArrLivingWages] = useState([]);

  const showItemsArr = (itemPage, pageLimit) => {
    const startIndex = (itemPage - 1) * pageLimit;
    const endIndex = itemPage * pageLimit;
    setArrLivingWages(livingWages.slice(startIndex, endIndex));
  };

  if (loading) {
    return <LoadingIdicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  const years = livingWages.map(({ dateStart }) => convertDate(dateStart, 'year')).sort();
  const months = livingWages.map(({ dateStart }) => convertDate(dateStart, 'months')).sort();
  console.log(years);

  return (
    <Col>
      <Tab.Content>
        <Tab.Pane eventKey={`socialgroup-${id}`}>
          <span style={{ display: "block" }}><input style={{ width: "100%", borderRadius: " 5px", borderColor: "#127ba3a8" }} type='serch' /></span>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <h5>Сортировка</h5>
                </th>
                <th>
                  <select style={{ verticalAlign: "center", display: 'block' }}>
                    <option disabled selected>Выберите год</option>
                    {years.filter((item, index) => years.indexOf(item) === index).map((year, index) => {
                      return <option key={index} value={year}>{year}</option>
                    })}
                  </select>
                </th>
                <th>
                  <select>
                    <option disabled selected>Выберите месяц</option>
                    {months.filter((item, index) => months.indexOf(item) === index).map((month, index) => {
                      return <option key={index} value={month}>{month}</option>
                    })}
                  </select>
                </th>
              </tr>
              <tr>
                <th>Прожиточный минмум</th>
                <th>Дата начала</th>
                <th>Дата окончания</th>
              </tr>
            </thead>
            <tbody>
              {arrLivingWages.map(({ id, wageValue, dateStart, dateStop }) => (
                <tr key={id}>
                  <td>{wageValue}</td>
                  <td>{dateStart}</td>
                  <td>{dateStop}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginator totalItemsCount={lengthLivingWages} showItemsArr={showItemsArr} />
        </Tab.Pane>
      </Tab.Content>
    </Col >
  )
}


export default LivingwagesDetails;