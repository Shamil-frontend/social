import React from 'react';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { object, string, setLocale } from 'yup';
import { Formik } from 'formik';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import CustomField from '../../generic/CustomField';
import SubmitBtn from '../../generic/SubmitBtn/SubmitBtn';

import validationSchemaLocale from '../../../utils/validationSchemaLocale';
import useAddItem from '../../wrappers/use-add-item';
import { fetchJobpositions, addJobposition } from '../../../redux/Jobpositions/actions';

import './AddJobpositions.scss';

setLocale(validationSchemaLocale);

const formValidationSchema = object().shape({
  name: string().required(),
});

const initialValues = {
  name: '',
};

const AddJobpositions = () => {

  const [isModalOpen, openModal, closeModal, addItem] = useAddItem(addJobposition, () => fetchJobpositions())
  const { adding } = useSelector(({ jobpositions }) => jobpositions);

  return (
    <React.Fragment>
      <Button onClick={openModal}>Добавить</Button>
      <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-jopPos-modal">
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
                id="add-jobposition-form"
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
                  <CustomField type="string" name="name" label="Наименование должности" />
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>Отмена</Button>
          <SubmitBtn variant="primary" form="add-jobposition-form" text="Добавить" isSubmitting={adding} />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AddJobpositions;