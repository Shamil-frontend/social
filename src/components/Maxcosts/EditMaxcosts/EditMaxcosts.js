import React, { useEffect } from 'react';
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

import { fetchMaxcosts, editMaxcost } from '../../../redux/Maxcosts/actions';
import validationSchemaLocale from '../../../utils/validationSchemaLocale';
import useEditItem from '../../wrappers/use-edit-item';
import parseISO from 'date-fns/parseISO';

setLocale(validationSchemaLocale);

const formValidationSchema = object().shape({
  maxCost: string().required(),
  dateStart: date().nullable().required(),
  dateStop: date().nullable(),
});

const EditMaxcosts = ({ item, togglerModal, onModalClose }) => {

  const [isModalOpen, openModal, closeModal, editItem] = useEditItem(editMaxcost, () => fetchMaxcosts());

  const { editing } = useSelector(({ roles }) => roles);

  const initialValues = {
    maxCost: item.maxCost,
    dateStart: item.dateStart ? parseISO(item.dateStart) : null,
    dateStop: item.dateStop ? parseISO(item.dateStop) : null,
  };

  useEffect(() => {
    if (!togglerModal) {
      openModal(true);
    }
    onModalClose(true)
  }, [openModal, onModalClose, item, togglerModal])

  return (
    <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-maxcosts-modal">
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
              id="edit-maxcost-form"
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
        <SubmitBtn variant="primary" form="edit-maxcost-form" text="Применить" isSubmitting={editing} />
      </Modal.Footer>
    </Modal>
  );
};

export default EditMaxcosts;