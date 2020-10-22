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

import { fetchRoles, addRole } from '../../../redux/Roles/actions';
import validationSchemaLocale from '../../../utils/validationSchemaLocale';
import useAddItem from '../../wrappers/use-add-item';

import './AddRoles.scss';

setLocale(validationSchemaLocale);

const formValidationSchema = object().shape({
  name: string().required(),
  nameRus: string().required(),
  rang: string().required(),
});

const initialValues = {
  name: '',
  nameRus: '',
  rang: '',
};

const AddRoles = () => {

  const [isModalOpen, openModal, closeModal, addItem] = useAddItem(addRole, () => fetchRoles());

  const { adding } = useSelector(({ roles }) => roles);

  return (
    <React.Fragment>
      <Button onClick={openModal}>Добавить</Button>
      <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-role-modal">
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
                id="add-role-form"
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
                <Form.Row>
                  <Form.Group as={Col} xs={10} controlId="name">
                    <CustomField name="name" label="Наименование Роли" />
                  </Form.Group>

                  <Form.Group as={Col} xs={2} controlId="rang">
                    <CustomField type="number" name="rang" label="Ранг" />
                  </Form.Group>
                </Form.Row>
                <Form.Group controlId="nameRus">
                  <CustomField name="nameRus" label="Наименование роли на русском" />
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>Отмена</Button>
          <SubmitBtn variant="primary" form="add-role-form" text="Добавить" isSubmitting={adding} />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AddRoles;