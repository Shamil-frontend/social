import React from 'react';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { object, string, setLocale, date } from 'yup';
import { Formik } from 'formik';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';

import CustomField from '../../generic/CustomField';
import SubmitBtn from '../../generic/SubmitBtn/SubmitBtn';
import DatePicker from '../../generic/DatePicker';

import { fetchMaxcosts, addMaxcost } from '../../../redux/Maxcosts/actions';
import validationSchemaLocale from '../../../utils/validationSchemaLocale';
import useAddItem from '../../wrappers/use-add-item';

import './AddMaxcosts.scss';

setLocale(validationSchemaLocale);

const formValidationSchema = object().shape({
  maxCost: string().required(),
  dateStart: date().nullable().required(),
  dateStop: date().nullable(),
});

const initialValues = {
  maxCost: '',
  dateStart: null,
  dateStop: null,
};

const AddMaxcosts = () => {

  const [isModalOpen, openModal, closeModal, addItem] = useAddItem(addMaxcost, () => fetchMaxcosts());

  const { adding } = useSelector(({ maxcosts }) => maxcosts);

  return (
    <React.Fragment>
      <Button onClick={openModal}>Добавить</Button>
      <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-maxcosts-modal">
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
                id="add-maxcost-form"
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
                  <Form.Group as={Col} xs={4} controlId="maxCost">
                    <CustomField name="maxCost" label="Макс. доля расходов" />
                  </Form.Group>
                  <Form.Group as={Col} xs={4} controlId="dateStart">
                    <DatePicker name="dateStart" label="Дата начала" />
                  </Form.Group>
                  <Form.Group as={Col} xs={4} controlId="dateStop">
                    <DatePicker name="dateStop" label="Дата окончания" />
                  </Form.Group>
                </Form.Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>Отмена</Button>
          <SubmitBtn variant="primary" form="add-maxcost-form" text="Добавить" isSubmitting={adding} />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AddMaxcosts;