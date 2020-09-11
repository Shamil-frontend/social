import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

import './paginator.css';

const Paginator = ({ totalItemsCount, portionLimit, pageLimit, activePage, setActivePage }) => {

  const [itemPage, setItemPage] = useState(1);
  const [portionNumber, setPortionNumber] = useState(1); //текущая порция кнопок пагинации

  const pagesCount = Math.ceil(totalItemsCount / pageLimit); //количество страниц
  const pageItems = [];   //массив из количества страниц
  for (let i = 1; i <= pagesCount; i++) {
    pageItems.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionLimit);   //количество порций кнопок пагинаций
  const leftPortionPageNumber = (portionNumber - 1) * portionLimit + 1;  //левая граница порции 
  const rightPortionPageNumber = portionNumber * portionLimit;  //правая граница порции 

  const currentPage = (param) => {
    setItemPage(param);
    setActivePage(param);
  };

  const prevPortion = (param) => {
    setItemPage((param - 1) * portionLimit);
    setPortionNumber(param - 1);
    setActivePage((param - 1) * portionLimit);
  };

  const nextPortion = (param) => {
    setItemPage(param * portionLimit + 1);
    setPortionNumber(param + 1)
    setActivePage(param * portionLimit + 1);
  };

  useEffect(() => {
    if (activePage === 1) {
      setItemPage(1);
      setPortionNumber(1);
    }
  }, [activePage])

  return (
    <Pagination className="m-0">
      {portionNumber > 1 ?
        <span className="btn btn-light"
          onClick={() => prevPortion(portionNumber)} >&#xab;</span> :
        <span className="btn btn-light disabled">&#xab;</span>}

      {pageItems.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((item) => {
        return <span className={`btn btn-light ${item === itemPage && "btn-light active"}`}
          key={item} onClick={() => currentPage(item)}>{item}</span>
      })}

      {portionCount > portionNumber ?
        <span className="btn btn-light"
          onClick={() => nextPortion(portionNumber)} >&#xbb;</span> :
        <span className="btn btn-light disabled">&#xbb;</span>}
    </Pagination>
  )
}

export default Paginator;