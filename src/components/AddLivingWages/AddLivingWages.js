import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { object, number, date, setLocale } from 'yup';
import { Formik } from 'formik';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CustomField from '../generic/CustomField';
import DatePicker from '../generic/DatePicker';
// import CustomSelect from '../generic/CustomSelect';

import { addLivingWages } from '../../redux/LivingWages/actions';

import validationSchemaLocale from '../../utils/validationSchemaLocale';
// import objectToFormData from '../../utils/objectToFormData';

setLocale(validationSchemaLocale);

const formValidationSchema = object().shape({
  // socialGroupId: object().nullable().required(),
  employableWageValue: number().required(),
  childWageValue: number().required(),
  pensionerWageValue: number().required(),
  dateStart: date().nullable().required(),
});

const initialValues = {
  // socialGroupId: null,
  employableWageValue: '',
  childWageValue: '',
  pensionerWageValue: '',
  dateStart: null,
};

const AddLivingWages = () => {

  const { id, addedLivingWages, adding, errorAdding } = useSelector(({ getLivingWages }) => getLivingWages);
  const socialGroups = useSelector(({ getSocialGroups }) => ({
    socialGroupsId: getSocialGroups.socialGroups.map(({ id }) => ({
      id
    }))
  }));

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const onSubmit = (values) => {
    dispatch(addLivingWages(values, socialGroups.socialGroupsId, id));
  };

  useEffect(() => {
    if (adding) {
      toast.info('Добавление нового поля');
    }
  }, [adding])

  useEffect(() => {
    if (addedLivingWages) {
      toast.success('Поле успешно добавлено');
      closeModal();
    }
  }, [addedLivingWages]);

  useEffect(() => {
    if (errorAdding) {
      toast.error('Ошибка, поле не добавлено', errorAdding.response.data);
    }
  }, [errorAdding])

  return (
    <React.Fragment>
      <Button onClick={openModal}>Добавить</Button>
      <Modal show={isModalOpen} onHide={closeModal} size="x1">
        <Modal.Header>
          <Modal.Title>Добавление данных</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={formValidationSchema}
            onSubmit={onSubmit}
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
                <fieldset className="mb-4">
                  <legend style={{ display: "none" }}>Данные по прожиточному минимуму</legend>
                  <Row>
                    <Col >
                      <Form.Row>
                        <Form.Group as={Col} sm={6} md={6} lg={6} controlId="employableWageValue">
                          <CustomField type="number" name="employableWageValue" label="Трудоспособные" />
                        </Form.Group>
                        <Form.Group as={Col} sm={6} md={6} lg={6} controlId="childWageValue">
                          <CustomField type="number" name="childWageValue" label="Дети" />
                        </Form.Group>
                        <Form.Group as={Col} sm={6} md={6} lg={6} controlId="pensionerWageValue">
                          <CustomField type="number" name="pensionerWageValue" label="Пенсионеры" />
                        </Form.Group>
                        <Form.Group as={Col} sm={6} md={6} lg={6} controlId="dateStart">
                          <DatePicker name="dateStart" label="Дата начала" />
                        </Form.Group>
                      </Form.Row>
                    </Col>
                  </Row>
                </fieldset>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>Отмена</Button>
          <Button type="submit" variant="primary" form="add-livingWage-form" >Добавить</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AddLivingWages;