import React from 'react';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { object, string, setLocale } from 'yup';
import { Formik } from 'formik';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';

import CustomField from '../../generic/CustomField';
import SubmitBtn from '../../generic/SubmitBtn/SubmitBtn';

import { fetchBanks, addBank } from '../../../redux/Banks/actions';
import validationSchemaLocale from '../../../utils/validationSchemaLocale';
import useAddItem from '../../wrappers/use-add-item';

import './AddBanks.scss';

setLocale(validationSchemaLocale);

const formValidationSchema = object().shape({
  name: string().required(),
  address: string().required(),
  city: string().required(),
  ks: string().required(),
  bik: string().required(),
});

const initialValues = {
  name: '',
  address: '',
  city: '',
  ks: '',
  bik: '',
};

const AddBanks = () => {

  const [isModalOpen, openModal, closeModal, addItem] = useAddItem(addBank, () => fetchBanks());

  const { adding } = useSelector(({ banks }) => banks);

  return (
    <React.Fragment>
      <Button onClick={openModal}>Добавить</Button>
      <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-bank-modal">
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
                id="add-bank-form"
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
                  <CustomField name="name" label="Наименование Банка" />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} xs={6} controlId="address">
                    <CustomField name="address" label="Адресс банка" />
                  </Form.Group>
                  <Form.Group as={Col} xs={6} controlId="city">
                    <CustomField name="city" label="Город расположения банка" />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} xs={6} controlId="ks">
                    <CustomField name="ks" label="Корреспондентский счет" />
                  </Form.Group>
                  <Form.Group as={Col} xs={6} controlId="bik">
                    <CustomField name="bik" label="Бик" />
                  </Form.Group>
                </Form.Row>

              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>Отмена</Button>
          <SubmitBtn variant="primary" form="add-bank-form" text="Добавить" isSubmitting={adding} />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AddBanks;