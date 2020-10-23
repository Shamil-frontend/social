import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Col, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

// import AddStandards from './AddStandards/AddStandards';
import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';
import SSJKU from './SSJKU';
// import SearchBar from '../generic/SearchBar';
// import DeleteBtn from '../generic/DeleteBtn';
import Select from 'react-select';

import { fetchCategories, fetchHousetypes, fetchStandards } from '../../redux/Standards/actions';
import { fetchAddressesReg, fetchAddressesChilds } from '../../redux/Addresses/actions';
// import convertDate from '../../utils/convertDate';

import './Standards.scss';



const Standards = () => {

  const SEASON = [
    {
      value: 1,
      label: "Круглогодичный"
    },
    {
      value: 2,
      label: "Зимний период"
    },
    {
      value: 3,
      label: "Летний период"
    }
  ];

  // const [curentItem, setCurentItem] = useState('');
  // const [searchValue, setSearchValue] = useState('');
  // const [closeDeleteModal, setCloseDeleteModal] = useState(true);
  const [tooggleVisibleTable, setTooggleVisibleTable] = useState(false);
  // const [filteredStandards, setFilteredStandards] = useState([]);
  const [additionalFilter, setAdditionalFilter] = useState(false);
  const [defaultCriteria, setDefaultCriteria] = useState({
    'categoryId': null,
    'seasonId': null,
    'regionsId': null,
    'citiesId': null,
    'settlementsId': null
  });
  // const [toggleMenuFilter, setToggleMenuFilter] = useState(false);

  // const btnColor = !toggleMenuFilter ? 'rgb(193 193 193)' : 'rgb(158 157 157)';
  // const btnWidth = !toggleMenuFilter ? '262px' : '0px';
  // const svgIcon = !toggleMenuFilter ? faLongArrowAltLeft : faLongArrowAltRight;
  // const contentWidth = !toggleMenuFilter ? 'calc(100% - 315px)' : 'calc(100% - 50px)';
  // const menuHidden = !toggleMenuFilter ? 'd-block' : 'd-none';

  const dispatch = useDispatch();
  const { error, loading, standardsList, housetypesList } = useSelector(({ standards }) => standards);
  const { addressName, houseTypeStandardValues } = standardsList;

  const categories = useSelector(({ standards }) => ({
    data: standards.categoriesList.map(({ id, categoryName }) => ({
      value: id,
      label: categoryName,
    })),
    loading: standards.loading,
    error: standards.error,
  }));

  const regions = useSelector(({ addresses }) => ({
    data: addresses.regionsList.map(({ id, offName }) => ({
      value: id,
      label: offName,
    })),
    loading: addresses.loading,
    error: addresses.error,
  }));

  const cities = useSelector(({ addresses }) => ({
    data: addresses.cities.map(({ id, offName }) => ({
      value: id,
      label: offName,
    })),
    loading: addresses.loadingChilds,
    error: addresses.errorChilds,
  }));

  const settlements = useSelector(({ addresses }) => ({
    data: addresses.settlements.filter(({ levelId }) => levelId === 6).map(({ id, offName }) => ({
      value: id,
      label: offName,
    })),
    loading: addresses.loadingChilds,
    error: addresses.errorChilds,
    leng: addresses.settlements.filter(({ levelId }) => levelId === 6).length
  }));

  // const onSearchChange = (search, data) => {
  //   if (!search) {
  //     return true;
  //   } else {
  //     const result = data.filter(({ standardValue }) => standardValue.toLowerCase().includes(search.toLowerCase()));
  //     setFilteredStandards(result);
  //   }
  // };

  // const visibleData = searchValue ? filteredStandards : houseTypeStandardValues && [houseTypeStandardValues[0]];

  // const deleteItem = (onError, itemId, firstValue) => dispatch(deleteStandard(itemId, firstValue));

  const getChildsAddresses = (id, addressTypes) => {
    dispatch(fetchAddressesChilds(id, addressTypes));
  };

  const onSelectChange = (val, name) => {
    switch (name) {
      case 'category':
        setAdditionalFilter(false);
        return (setDefaultCriteria((prevState) => ({
          ...prevState,
          'categoryId': val,
          'seasonId': null,
          'regionsId': null,
          'citiesId': null,
          'settlementsId': null
        })));

      case 'season':
        setAdditionalFilter(false);
        return (setDefaultCriteria({
          ...defaultCriteria,
          'seasonId': val,
          'regionsId': null,
          'citiesId': null,
          'settlementsId': null
        }));
      case 'regions':
        setAdditionalFilter(false);
        return (setDefaultCriteria({
          ...defaultCriteria,
          'regionsId': val,
          'citiesId': null,
          'settlementsId': null
        }));

      case 'cities':
        setAdditionalFilter(true);
        return (setDefaultCriteria({
          ...defaultCriteria,
          'citiesId': val,
          'settlementsId': null
        }));
      case 'settlements':
        return (setDefaultCriteria({
          ...defaultCriteria,
          'settlementsId': val,
        }));
      default:
        return (setDefaultCriteria({
          ...defaultCriteria,
        }));
    }
  }

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAddressesReg());
    dispatch(fetchHousetypes());
  }, [dispatch]);

  // useEffect(() => {
  //   onSearchChange(searchValue, standardsList)
  // }, [searchValue, standardsList, visibleData]);

  useEffect(() => {
    if (defaultCriteria.citiesId) {
      setTooggleVisibleTable(true);
    } else {
      setTooggleVisibleTable(false);
    }
  }, [defaultCriteria.citiesId])

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <>
      <div className="standards-container">
        {/* <button
          style={{ left: `${btnWidth}` }}
          className="toggler-menu-filter"
          onClick={() => setToggleMenuFilter((prevState) => !prevState)} >
          <FontAwesomeIcon icon={svgIcon} style={{ width: '30px', height: '25px', color: `${btnColor}` }} />
        </button>
        <span className={`${!toggleMenuFilter ? 'null' : 'polosa'}`}></span> */}
        <Col className="standards-menu">
          <Form.Group controlId="categoryId">
            <Form.Label>Категории семей</Form.Label>
            <Select
              name="categoryId"
              placeholder="Выберите из вариантов"
              options={categories.data}
              isLoading={categories.loading}
              isDisabled={categories.error}
              value={defaultCriteria.categoryId}
              isClearable
              onChange={(val) => onSelectChange(val, 'category')}
            />
          </Form.Group>

          <Form.Group controlId="seasonId">
            <Form.Label>Сезон</Form.Label>
            <Select
              name="seasonId"
              placeholder={!defaultCriteria.categoryId ? '' : "Выберите из вариантов"}
              options={SEASON}
              isDisabled={!defaultCriteria.categoryId}
              value={defaultCriteria.seasonId}
              onChange={(val) => onSelectChange(val, 'season')}
            />
          </Form.Group>

          <Form.Group controlId="regionsId">
            <Form.Label>Регионы РФ</Form.Label>
            <Select
              name="regionsId"
              placeholder={!defaultCriteria.seasonId ? '' : "Выберите из вариантов"}
              options={regions.data}
              isLoading={regions.loading}
              isDisabled={regions.error || !defaultCriteria.seasonId}
              value={defaultCriteria.regionsId}
              onChange={(val) => {
                onSelectChange(val, 'regions');
                return getChildsAddresses(val.value, 'cities')
              }}
            />
          </Form.Group>

          <Form.Group controlId="citiesId">
            <Form.Label>Города/Районы</Form.Label>
            <Select
              name="citiesId"
              placeholder={!defaultCriteria.regionsId ? '' : "Выберите из вариантов"}
              options={cities.data}
              isDisabled={cities.error || !defaultCriteria.regionsId}
              value={defaultCriteria.citiesId}
              onChange={(val) => {
                const values = {
                  ...defaultCriteria,
                  citiesId: val,
                  settlementsId: null
                }

                dispatch(fetchStandards({
                  addressId: values.citiesId.value,
                  categoryId: values.categoryId.value,
                  seasonId: values.seasonId.value
                }));
                getChildsAddresses(val.value, 'settlements');
                return onSelectChange(val, 'cities');
              }}
            />
          </Form.Group>

          {additionalFilter && settlements.leng !== 0 ?
            (<Form.Group controlId="settlementsId">
              <Form.Label>Поселки/Села</Form.Label>
              <Select
                name="settlementsId"
                placeholder={!defaultCriteria.citiesId ? '' : "Выберите из вариантов"}
                options={settlements.data}
                isDisabled={settlements.error || !defaultCriteria.citiesId}
                value={defaultCriteria.settlementsId}
                onChange={(val) => {
                  const values = {
                    ...defaultCriteria,
                    settlementsId: val
                  }

                  dispatch(fetchStandards({
                    addressId: values.settlementsId.value,
                    categoryId: values.categoryId.value,
                    seasonId: values.seasonId.value
                  }));
                  return onSelectChange(val, 'settlements');
                }}
              />
            </Form.Group>) :
            null
          }
        </Col>



        {tooggleVisibleTable ?
          (<SSJKU
            addressName={addressName}
            houseTypeStandardValues={houseTypeStandardValues}
            housetypesList={housetypesList}
            defaultCriteria={defaultCriteria}
            cities={cities}
          />) :
          (
            <Alert className="alert-container" variant="secondary">
              <FontAwesomeIcon icon={faExclamationCircle} style={{ width: '20px', color: '#5ba6bd' }} />
              <span className="alert-text">Заполните фильтр ...</span>
            </Alert>
          )
        }

      </div>
    </>
  )
}


export default Standards;

