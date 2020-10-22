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
import useAddItem from '../../wrappers/use-add-item';
import { fetchOrgunits, fetchOrgstructures, addOrgstructure } from '../../../redux/Orgstructures/actions';

import './AddOrgstructure.scss';

setLocale(validationSchemaLocale);

const formValidationSchema = object().shape({
  parentId: object().nullable().required(),
  orgUnitId: object().nullable().required(),
  name: string().required(),
  address: string().required(),
  eMail: string().email().required(),
  phoneNumber1: string().required(),
  phoneNumber2: string(),
});


const AddOrgstructure = () => {

  const initialValues = {
    parentId: null,
    orgUnitId: null,
    name: '',
    address: '',
    eMail: '',
    phoneNumber1: '',
    phoneNumber2: '',
  };

  const dispatch = useDispatch();
  const [isModalOpen, openModal, closeModal, addItem] = useAddItem(addOrgstructure, () => fetchOrgstructures())
  const { adding } = useSelector(({ orgstructures }) => orgstructures);

  const orgstructures = useSelector(({ orgstructures }) => ({
    data: orgstructures.orgstructuresList.map(({ id, name }) => ({
      value: id,
      label: name,
    })),
    loading: orgstructures.loading,
    error: orgstructures.error,
  }));
  const orgTypeName = [
    { value: '00000000-0000-0000-0000-000000000001', label: 'Организация' },
    ...orgstructures.data
  ];
  const orgUnitType = useSelector(({ orgstructures }) => ({
    data: orgstructures.orgunitsList.map(({ id, name }) => ({
      value: id,
      label: name,
    })),
    loading: orgstructures.unitsLoading,
    error: orgstructures.unitsError,
  }));

  useEffect(() => {
    dispatch(fetchOrgunits())
  }, [dispatch])

  return (
    <React.Fragment>
      <Button onClick={openModal}>Добавить</Button>
      <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-org-modal">
        <Modal.Header>
          <Modal.Title>Добавление данных</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={formValidationSchema}
            onSubmit={addItem}
            initialValues={initialValues}>
            {({ errors, handleSubmit }) => (
              <Form
                id="add-orgstructure-form"
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
          <SubmitBtn variant="primary" form="add-orgstructure-form" text="Добавить" isSubmitting={adding} />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AddOrgstructure;

// .filter(({ value, }, i, a) => a.map(item => item.value).indexOf(value) === i).sort((a, b) => a.value - b.value)