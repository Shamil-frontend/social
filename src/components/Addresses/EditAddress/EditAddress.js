import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import SubmitBtn from '../../generic/SubmitBtn/SubmitBtn';
import { ApartmentForm, StreetForm, HouseForm } from '../Forms';

import { fetchAddressesChilds, editAddress } from '../../../redux/Addresses/actions';
import useEditItem from '../../wrappers/use-edit-item';

const EditAddress = ({ item, typeAddress, togglerModal, onModalClose, parentIds }) => {

  const [isModalOpen, openModal, closeModal, editItem] = useEditItem(editAddress, () => fetchAddressesChilds(parentIds[typeAddress]))

  const { editing } = useSelector(({ addresses }) => addresses);

  const initialValues = {
    id: item.id,
    offName: item.offName,
    postalCode: item.postalCode,
    houseNum: item.houseNum,
    houseBuild: item.houseBuild,
    houseStruct: item.houseStruct,
    flatNum: item.flatNum,
  };

  useEffect(() => {
    if (!togglerModal) {
      openModal(true);
    }
    onModalClose(true)
  }, [openModal, onModalClose, item, togglerModal])


  const streetForm = typeAddress === 'streets' ? (
    <StreetForm initialValues={initialValues} onSubmit={editItem} />
  ) : null;
  const houseForm = typeAddress === 'houses' ? (
    <HouseForm initialValues={initialValues} onSubmit={editItem} />
  ) : null;
  const apartmentForm = typeAddress === 'apartments' ? (
    <ApartmentForm initialValues={initialValues} onSubmit={editItem} />
  ) : null;

  return (
    <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-address-modal">
      <Modal.Header>
        <Modal.Title>Редактирование данных</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {streetForm}
        {houseForm}
        {apartmentForm}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={closeModal}>Отмена</Button>
        <SubmitBtn variant="primary" form={`${typeAddress + "-form"}`} text="Применить" isSubmitting={editing} />
      </Modal.Footer>
    </Modal>
  );
};

export default EditAddress;