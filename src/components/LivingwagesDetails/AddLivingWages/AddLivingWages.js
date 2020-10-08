import React from 'react';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { object, number, date, setLocale } from 'yup';
import { Formik } from 'formik';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';

import CustomField from '../../generic/CustomField';
import DatePicker from '../../generic/DatePicker';
import SubmitBtn from '../../generic/SubmitBtn/SubmitBtn';

import useAddItem from '../../wrappers/use-add-item';
import { fetchLivingWages, addLivingWages } from '../../../redux/LivingWages/actions';

import validationSchemaLocale from '../../../utils/validationSchemaLocale';

import './AddLivingWages.scss';

setLocale(validationSchemaLocale);

const formValidationSchema = object().shape({
  employableWageValue: number().required(),
  childWageValue: number().required(),
  pensionerWageValue: number().required(),
  dateStart: date().nullable().required(),
});

const initialValues = {
  employableWageValue: '',
  childWageValue: '',
  pensionerWageValue: '',
  dateStart: null,
};

const AddLivingWages = () => {

  const { id, adding } = useSelector(({ livingWages }) => livingWages);

  const socialGroups = useSelector(({ socialGroups }) => ({
    socialGroupsId: socialGroups.socialGroups.map(({ id }) => ({
      id
    }))
  }));

  const [isModalOpen, openModal, closeModal, addItem] = useAddItem(addLivingWages, () => fetchLivingWages(id), socialGroups.socialGroupsId);

  return (
    <React.Fragment>
      <Button onClick={openModal}>Добавить</Button>
      <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-living-modal">
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
                id="add-livingWage-form"
                noValidate
                onSubmit={(evt) => {
                  evt.preventDefault();

                  if (Object.keys(errors).length) {
                    toast.error('Заполните все обязательные поля');
                  }

                  handleSubmit();
                }}
              >
                <Form.Row>
                  <Form.Group as={Col} xs={4} controlId="employableWageValue">
                    <CustomField type="number" name="employableWageValue" label="Трудоспособные" />
                  </Form.Group>
                  <Form.Group as={Col} xs={4} controlId="childWageValue">
                    <CustomField type="number" name="childWageValue" label="Дети" />
                  </Form.Group>
                  <Form.Group as={Col} xs={4} controlId="pensionerWageValue">
                    <CustomField type="number" name="pensionerWageValue" label="Пенсионеры" />
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="dateStart">
                  <DatePicker name="dateStart" label="Дата начала" />
                </Form.Group>

              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>Отмена</Button>
          <SubmitBtn variant="primary" form="add-livingWage-form" text="Добавить" isSubmitting={adding} />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AddLivingWages;