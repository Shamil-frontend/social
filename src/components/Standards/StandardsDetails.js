import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import DeleteBtn from '../generic/DeleteBtn';

import convertDate from '../../utils/convertDate';
import { deleteStandard } from '../../redux/Standards/actions';

// import './StandardsDetails.scss';

const StandardsDetails = ({ data, defaultCriteria, searchValue }) => {

  const dispatch = useDispatch();
  const [curentItem, setCurentItem] = useState('');
  const [closeDeleteModal, setCloseDeleteModal] = useState(true);
  const [filteredStandards, setFilteredStandards] = useState([]);

  // const visibleData = searchValue ? filteredStandards : data;

  // const onSearchChange = (search, data) => {
  //   if (!search) {
  //     return true;
  //   } else {
  //     const result = data.filter(({ standardValue }) => standardValue.toLowerCase().includes(search.toLowerCase()));
  //     setFilteredStandards(result);
  //   }
  // };

  const deleteItem = (onError, itemId, firstValue) => dispatch(deleteStandard(itemId, firstValue));

  // useEffect(() => {
  //   onSearchChange(searchValue, visibleData)
  // }, [searchValue, visibleData, data]);

  return (
    <>
      <div className="standard-table-wrapper">
        <Table hover className="reference-table">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead className="thead-block thead-standards" >
            <tr>
              <th>№</th>
              <th>Стандарт на одного</th>
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
                    <tbody className="tBody-block tBody-standards">
                      {data && data[0].standardValues.length ?
                        (data.map(({ standardValues }) => {
                          console.log(data)

                          return standardValues.map(({ dateStart, dateStop, id, value }, index) => {
                            return (
                              <tr key={id}>
                                <td>{index + 1}</td>
                                <td>{value}</td>
                                <td>{convertDate(dateStart)}</td>
                                <td>{convertDate(dateStop)}</td>
                                <td >
                                  <div className="btn-wrapper">
                                    <Button className="btn-delete" onClick={() => {
                                      setCurentItem(id);
                                      setCloseDeleteModal(false);
                                    }}>
                                      <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            )
                          }
                          )
                        })) : (
                          <tr>
                            <td className="text-muted">Данные отсутствуют</td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </Table >
      </div>

      <DeleteBtn
        onDelete={deleteItem}
        togglerModal={closeDeleteModal}
        itemId={curentItem.id}
        firstValue={defaultCriteria}
        onModalClose={(bool) => setCloseDeleteModal(bool)} />
    </>
  )
}


export default StandardsDetails;
