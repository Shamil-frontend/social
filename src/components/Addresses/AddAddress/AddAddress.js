import React from 'react';
import { useSelector } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import SubmitBtn from '../../generic/SubmitBtn';
import { ApartmentForm, StreetForm, HouseForm } from '../Forms';
import { fetchAddressesChilds, addAddress } from '../../../redux/Addresses/actions';
import useAddItem from '../../wrappers/use-add-item';

import './AddAddress.scss';

const AddAddress = ({ typeAddress, isDisabled, parentIds, addressLevelId }) => {

  const [isModalOpen, openModal, closeModal, addItem] = useAddItem(addAddress, () => fetchAddressesChilds(parentIds[typeAddress], typeAddress))
  const { adding } = useSelector(({ addresses }) => addresses);

  const initialValues = {
    parentId: parentIds[typeAddress],
    levelId: addressLevelId,
    offName: '',
    postalCode: '',
    houseNum: '',
    houseBuild: '',
    houseStruct: '',
    flatNum: '',
  };

  const streetForm = typeAddress === 'streets' ? (
    <StreetForm initialValues={initialValues} onSubmit={addItem} />
  ) : null;
  const houseForm = typeAddress === 'houses' ? (
    <HouseForm initialValues={initialValues} onSubmit={addItem} />
  ) : null;
  const apartmentForm = typeAddress === 'apartments' ? (
    <ApartmentForm initialValues={initialValues} onSubmit={addItem} />
  ) : null;

  return (
    <React.Fragment>
      <Button onClick={openModal} className="adress-add-btn" disabled={isDisabled}></Button>
      <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-address-modal">
        <Modal.Header>
          <Modal.Title>Добавление данных</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {streetForm}
          {houseForm}
          {apartmentForm}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>Отмена</Button>
          <SubmitBtn variant="primary" form={`${typeAddress + "-form"}`} text="Добавить" isSubmitting={adding} />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AddAddress;