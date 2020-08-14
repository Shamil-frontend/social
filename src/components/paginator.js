import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

const Paginator = ({ totalItemsCount, showItemsArr, portionLimit = 3, pageLimit = 8 }) => {

  const [activePage, setActivePage] = useState(1);
  const [portionNumber, setPortionNumber] = useState(1);

  useEffect(() => {
    pokaifu(1, pageLimit)
  }, [pageLimit]);

  const pagesCount = Math.ceil(totalItemsCount / pageLimit); //количество страниц
  const pageItems = [];   //массив из количества страниц
  for (let i = 1; i <= pagesCount; i++) {
    pageItems.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionLimit);   //количество порций кнопок пагинаций
  const leftPortionPageNumber = (portionNumber - 1) * portionLimit + 1;
  const rightPortionPageNumber = portionNumber * portionLimit;


  const pokaifu = (itemPage, pageLimit) => {
    showItemsArr(itemPage, pageLimit);
    setActivePage(itemPage);
  }

  const pokaifu2 = (param, pageLimit) => {
    showItemsArr(param + 1, pageLimit);
    setActivePage(param + 1);
    setPortionNumber(param - 1)
  }

  const pokaifu3 = (param, pageLimit) => {
    showItemsArr(param + rightPortionPageNumber, pageLimit);
    setActivePage(param + rightPortionPageNumber);
    setPortionNumber(param + 1)
    console.log(param + rightPortionPageNumber)
  }

  return (
    <Pagination>
      {portionNumber > 1 &&
        <button className="btn btn-outline-dark" onClick={() => pokaifu2(portionNumber, pageLimit)} >&#xab;</button>}

      {pageItems.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((item) => {
        return <span className={`btn btn-primary ${item === activePage && "disabled"}`} key={item} onClick={() => pokaifu(item, pageLimit)}>{item}</span>
      })}

      {portionCount > portionNumber &&
        <button className="btn btn-outline-dark" onClick={() => pokaifu3(portionNumber, pageLimit)} >&#xbb;</button>}
    </Pagination>
  )
}

export default Paginator;