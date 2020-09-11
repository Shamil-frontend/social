import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Col, Row, Table } from 'react-bootstrap';

import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';

import { fetchAdresses } from '../../redux/Adresses/action';

import './Adresses.css';

const Adresses = () => {

  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(({ getAdresses }) => getAdresses);

  console.log("data", data);


  useEffect(() => {
    dispatch(fetchAdresses())
  }, [dispatch])

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <Row  >
      <Col>
        <Table striped bordered hover className="adresses-table">
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead className="thead-block">
            <tr>
              <th>adresses</th>
              <th>adresses</th>
              <th>adresses</th>
            </tr>
          </thead>
          <tbody className="tBody-block">
            <tr>
              <td colSpan="3" className="p-0">
                <div className="table-wrapper">
                  <table className="table-container">
                    <colgroup>
                      <col />
                      <col />
                      <col />
                    </colgroup>
                    <tbody className="tBody-block">
                      {data.length ? (
                        data.map(({ fullName, id, levelName, name, parentId }) => (
                          <tr key={id}>
                            <td>{fullName}</td>
                            <td>{levelName}</td>
                            <td>{name}</td>
                          </tr>
                        ))) : (
                          < tr >
                            <td className="text-muted">Ничего не найдено</td>
                          </tr>
                        )}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row >

  )
}

export default Adresses;