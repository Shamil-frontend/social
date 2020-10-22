import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { object, string, setLocale } from 'yup';
import { Formik } from 'formik';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';

import CustomSelect from '../../generic/CustomSelect';
import CustomField from '../../generic/CustomField';
import SubmitBtn from '../../generic/SubmitBtn/SubmitBtn';

import validationSchemaLocale from '../../../utils/validationSchemaLocale';
import { fetchOrgunits, fetchOrgstructures, editOrgstructure } from '../../../redux/Orgstructures/actions';
import useEditItem from '../../wrappers/use-edit-item';

setLocale(validationSchemaLocale);

const formValidationSchema = object().shape({
  id: string(),
  parentId: object().nullable(),
  orgUnitId: object().nullable(),
  name: string(),
  address: string(),
  eMail: string().email(),
  phoneNumber1: string(),
  phoneNumber2: string(),
});

const EditOrgstucture = ({ item, togglerModal, onModalClose }) => {

  const dispatch = useDispatch();
  const [isModalOpen, openModal, closeModal, editItem] = useEditItem(editOrgstructure, () => fetchOrgstructures())
  const { editing } = useSelector(({ orgstructures }) => orgstructures);

  const initialValues = {
    id: item.id,
    parentId: {
      value: item.parentId,
      label: item.parentName === '' ? "Организация" : item.parentName
    },
    orgUnitId: {
      value: item.orgUnitId,
      label: item.orgUnitName
    },
    name: item.name,
    address: item.address,
    eMail: item.eMail,
    phoneNumber1: item.phoneNumber1,
    phoneNumber2: item.phoneNumber2,
  };

  const orgstructures = useSelector(({ orgstructures }) => ({
    data: orgstructures.orgstructuresList.map(({ parentId, name }) => ({
      value: parentId,
      label: name,
    })),
    loading: orgstructures.loading,
    error: orgstructures.error,
  }));

  const orgUnitType = useSelector(({ orgstructures }) => ({
    data: orgstructures.orgunitsList.map(({ id, name }) => ({
      value: id,
      label: name,
    })),
    loading: orgstructures.unitsLoading,
    error: orgstructures.unitsError,
  }));

  const orgTypeName = [
    { value: '00000000-0000-0000-0000-000000000001', label: 'Организация' },
    ...orgstructures.data
  ];

  useEffect(() => {
    if (!togglerModal) {
      openModal(true);
    }
    onModalClose(true)
  }, [openModal, onModalClose, item, togglerModal])

  useEffect(() => {
    dispatch(fetchOrgunits())
  }, [dispatch])

  return (
    <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-org-modal">
      <Modal.Header>
        <Modal.Title>Редактирование данных</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={formValidationSchema}
          onSubmit={editItem}
          initialValues={initialValues}>
          {({ errors, handleSubmit }) => (
            <Form
              id="edit-orgstructure-form"
              noValidate
              onSubmit={(evt) => {
                evt.preventDefault();

                if (Object.keys(errors).length) {
                  toast.error('Заполните все обязательные поля');
                  console.log(errors)
                }

                handleSubmit();
              }}
            >
              <Form.Group controlId="name">
                <CustomField type="string" name="name" label="Наименование организации" />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} xs={6}>
                  <CustomSelect
                    name="parentId"
                    placeholder="Над структура"
                    label="Над структура"
                    data={orgTypeName}
                    isLoading={orgstructures.loading}
                    isDisabled={orgstructures.error}
                  />
                </Form.Group>
                <Form.Group as={Col} xs={6}>
                  <CustomSelect
                    name="orgUnitId"
                    placeholder="Тип организации"
                    label="Тип организации"
                    data={orgUnitType.data}
                    isLoading={orgUnitType.loading}
                    isDisabled={orgUnitType.error}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="address">
                <CustomField type="string" name="address" label="Адресс" />
              </Form.Group>
              <Form.Group controlId="eMail">
                <CustomField type="string" name="eMail" label="Email" />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} xs={6} controlId="phoneNumber1">
                  <CustomField type="string" name="phoneNumber1" label="Основной тел. организации" />
                </Form.Group>
                <Form.Group as={Col} xs={6} controlId="phoneNumber2">
                  <CustomField type="string" name="phoneNumber2" label="Дополнительный тел. организации" />
                </Form.Group>
              </Form.Row>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={closeModal}>Отмена</Button>
        <SubmitBtn variant="primary" form="edit-orgstructure-form" text="Применить" isSubmitting={editing} />
      </Modal.Footer>
    </Modal>
  );
};

export default EditOrgstucture;