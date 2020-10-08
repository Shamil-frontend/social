import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { object, string, setLocale, array } from 'yup';
import { Formik } from 'formik';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';

import CustomSelect from '../../generic/CustomSelect';
import CustomField from '../../generic/CustomField';
import SubmitBtn from '../../generic/SubmitBtn/SubmitBtn';

import { fetchRelations, fetchRelDependences, addRelDependence } from '../../../redux/Relations/actions';
import validationSchemaLocale from '../../../utils/validationSchemaLocale';
import useAddItem from '../../wrappers/use-add-item';

import './AddRelDependence.scss';

setLocale(validationSchemaLocale);

const formValidationSchema = object().shape({
  name: string().required(),
  isNear: object().nullable().required(),
  relationIdDependences: array().nullable().required(),
});

const initialValues = {
  name: '',
  isNear: null,
  relationIdDependences: null,
};

const AddRelDependence = () => {

  const dispatch = useDispatch();
  const [isModalOpen, openModal, closeModal, addItem] = useAddItem(addRelDependence, () => fetchRelDependences());

  const statusIndividual = [
    {
      value: true,
      label: 'Ближайший'
    },
    {
      value: false,
      label: 'Неближайший'
    }
  ];

  const { adding } = useSelector(({ relations }) => relations);

  const relations = useSelector(({ relations }) => ({
    data: relations.relationsList.map(({ id, name }) => ({
      value: id,
      label: name,
    })),
    loading: relations.relationsLoading,
    error: relations.relationsError,
  }));

  useEffect(() => {
    dispatch(fetchRelations());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Button onClick={openModal}>Добавить</Button>
      <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-relation-modal">
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
                id="add-relation-form"
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
                  <Form.Group as={Col} xs={6} controlId="name">
                    <CustomField name="name" label="Наименование Физ.лица" />
                  </Form.Group>
                  <Form.Group as={Col} xs={6}>
                    <CustomSelect
                      name="isNear"
                      label="Ближайщий родственик"
                      data={statusIndividual}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group >
                  <CustomSelect
                    isMulti={true}
                    name="relationIdDependences"
                    label="Зависимое Физ.лицо"
                    data={relations.data}
                    isLoading={relations.loading}
                    isDisabled={relations.error}
                  />
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>Отмена</Button>
          <SubmitBtn variant="primary" form="add-relation-form" text="Добавить" isSubmitting={adding} />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AddRelDependence;