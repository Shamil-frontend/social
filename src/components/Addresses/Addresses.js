import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Col, Form, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';
import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';
import SearchBar from '../generic/SearchBar';
import AddAddress from './AddAddress/AddAddress';
import EditAddress from './EditAddress/EditAddress';
import DeleteBtn from '../generic/DeleteBtn';

import { fetchAddressesReg, fetchAddressesChilds, deleteAddress } from '../../redux/Addresses/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import './Addresses.scss';


const Addresses = () => {

  const dispatch = useDispatch();

  const [curentItem, setCurentItem] = useState('');
  const [closeEditModal, setCloseEditModal] = useState(true);
  const [closeDeleteModal, setCloseDeleteModal] = useState(true);
  const [curentAddressName, setCurentAddressName] = useState('');
  const [searchValue, setSearchValue] = useState({
    'cities': '',
    'settlements': '',
    'streets': '',
    'houses': '',
    'apartments': '',
  });
  const [activeClassItems, setActiveClassItems] = useState({
    'cities': '',
    'settlements': '',
    'streets': '',
    'houses': '',
    'apartments': '',
  });
  const [filteredAddresses, setFilteredAddresses] = useState({});
  const [parentIds, setParentIds] = useState({
    'streets': '',
    'houses': '',
    'apartments': '',
  });

  const addresses = useSelector(({ addresses }) => addresses);

  React.useEffect(() => {
    const { cities, settlements, streets, houses, apartments } = addresses;

    setFilteredAddresses({
      cities,
      settlements,
      streets,
      houses,
      apartments,
    })
  }, [addresses])

  const ADDRESS_COLUMNS = React.useMemo(() => [
    {
      title: "Города и районы",
      data: filteredAddresses.cities ? filteredAddresses.cities : [],
      nextName: 'settlements',
      addressName: 'cities',
      addressLevelId: '3',
      addBtn: false,
      viewBtn: false,
      editBtn: false,
      deleteBtn: false,
    },
    {
      title: "Населенные пункты",
      data: filteredAddresses.settlements ? filteredAddresses.settlements : [],
      nextName: 'streets',
      addressName: 'settlements',
      addressLevelId: '6',
      addBtn: false,
      viewBtn: false,
      editBtn: false,
      deleteBtn: false,
    },
    {
      title: "Улицы",
      data: filteredAddresses.streets ? filteredAddresses.streets : [],
      nextName: 'houses',
      addressName: 'streets',
      addressLevelId: '7',
      addBtn: true,
      viewBtn: true,
      editBtn: true,
      deleteBtn: true,
    },
    {
      title: "Дома",
      data: filteredAddresses.houses ? filteredAddresses.houses : [],
      nextName: 'apartments',
      addressName: 'houses',
      addressLevelId: '71',
      addBtn: true,
      viewBtn: true,
      editBtn: true,
      deleteBtn: true,
    },
    {
      title: "Квартиры",
      data: filteredAddresses.apartments ? filteredAddresses.apartments : [],
      nextName: '',
      addressName: 'apartments',
      addressLevelId: '72',
      addBtn: true,
      viewBtn: true,
      editBtn: true,
      deleteBtn: true,
    },
  ], [filteredAddresses]);


  const onClearColumItems = () => {
    setSearchValue({
      'cities': '',
      'settlements': '',
      'streets': '',
      'houses': '',
      'apartments': '',
    })
    setParentIds({
      'streets': '',
      'houses': '',
      'apartments': '',
    })
    setActiveClassItems({
      'cities': false,
      'settlements': false,
      'streets': false,
      'houses': false,
      'apartments': false,
    })
  }

  const getChildsAddresses = (id, addressLevel) => {
    dispatch(fetchAddressesChilds(id, addressLevel));
  };

  const onSearchChange = (value, addressName) => {
    const result = addresses[addressName].filter(item => String(item.offName).toLowerCase().includes(value.toLowerCase()));
    setFilteredAddresses((prevState) => ({
      ...prevState,
      [addressName]: result
    }));
    setSearchValue({
      ...searchValue,
      [addressName]: value
    })
  };

  const onAddressItemClick = (id, nextName, addressName) => {
    setActiveClassItems({
      ...activeClassItems,
      [addressName]: id
    });
    getChildsAddresses(id, nextName);
    switch (nextName) {
      case 'settlements':
        return (setParentIds({
          'streets': '',
          'houses': '',
          'apartments': '',
        }));

      case 'streets':
        return (setParentIds({
          'streets': id,
          'houses': '',
          'apartments': '',
        }));

      case 'houses':
        return (setParentIds({
          ...parentIds,
          'houses': id,
          'apartments': '',
        }));
      case 'apartments':
        return (setParentIds({
          ...parentIds,
          'apartments': id,
        }));

      case '':
        return (setParentIds({
          ...parentIds,
        }));
      default:
        return (setParentIds({
          ...parentIds,
        }));
    }
  };

  const deleteItem = (onError, itemId, itemParentId, itemAddressName) => dispatch(deleteAddress(itemId, itemParentId, itemAddressName));

  useEffect(() => {
    dispatch(fetchAddressesReg());
  }, [dispatch])

  if (addresses.loadingReg) {
    return <LoadingIndicator />;
  }

  if (addresses.errorReg) {
    return <ErrorIndicator />;
  }

  return (
    <>
      <div className="addresses-container">
        <Row className="addresses-top-block">
          <Col className="select-block">
            <FormGroup className="select-wrapper">
              <Form.Control className="select-adresses" as="select" onChange={(evt) => { getChildsAddresses(evt.target.value, 'cities'); onClearColumItems() }} size="sm" custom>
                <option></option>
                {addresses.addressesRegions.map(({ offName, id }) => (
                  <option key={id} value={id} >{offName}</option>
                ))}
              </Form.Control>
              <FormLabel className="select-label">Регионы РФ</FormLabel>
            </FormGroup>
          </Col>
        </Row>

        <Row className="addresses-btm-block">
          {ADDRESS_COLUMNS.map(({ title, data, nextName, addressName, addressLevelId, addBtn, viewBtn, editBtn, deleteBtn }) => {
            return (
              <Col className="addresses-column-wrapper" key={addressName}>
                <Row className="m-0 justify-content-between flex-nowrap">
                  <h4 className="addresses-column-tittle">{title}</h4>
                  {addBtn ?
                    <AddAddress isDisabled={!parentIds[addressName]} typeAddress={addressName} parentIds={parentIds} addressLevelId={addressLevelId} />
                    :
                    null
                  }
                </Row>
                <Col className="serchBar-block">
                  <SearchBar onSearchChange={(value) => onSearchChange(value, addressName)} value={searchValue[addressName]} />
                </Col>
                <div className="address-column-wrapper table-scroll">
                  <Nav className="addresses-column-list">
                    {data.length ?
                      data.map((item) => {
                        return (
                          <NavItem key={item.id} className={`addresses-column-item ${activeClassItems[addressName] === item.id ? "active-column-item" : null}`}>
                            <Button
                              className="address-btn-link"
                              onClick={() => { onAddressItemClick(item.id, nextName, addressName); setCurentItem(''); setCurentAddressName('') }}>
                              {item.levelId === 71 || item.levelId === 72 ? item.name : item.offName}
                            </Button>
                            <div className="adress-btn-wrapper">
                              {editBtn && (
                                <Button className="adress-btn-edit" onClick={() => {
                                  setCurentItem(item);
                                  setCurentAddressName(addressName);
                                  setCloseEditModal(false)
                                }}>
                                  <FontAwesomeIcon icon={faEdit} />
                                </Button>
                              )}

                              {deleteBtn && (
                                <Button className="adress-btn-delete" onClick={() => {
                                  setCurentItem(item);
                                  setCurentAddressName(addressName);
                                  setCloseDeleteModal(false);
                                }}>
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              )}
                            </div>
                          </NavItem>
                        )
                      }) :
                      "Данные отсутствуют"
                    }
                  </Nav>
                </div>
              </Col>
            )
          })}
        </Row>
      </div >
      <DeleteBtn
        onDelete={deleteItem}
        togglerModal={!closeDeleteModal}
        itemId={curentItem.id}
        itemParentId={curentItem.parentId}
        itemAddressName={curentAddressName}
        onModalClose={(bool) => setCloseDeleteModal(bool)} />

      <EditAddress
        item={curentItem}
        togglerModal={closeEditModal}
        onModalClose={(bool) => setCloseEditModal(bool)}
        parentIds={parentIds}
        typeAddress={curentAddressName} />
    </>
  )
}

export default Addresses;

