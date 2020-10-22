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

import { fetchRelations, fetchRelDependences, editRelDependence } from '../../../redux/Relations/actions';
import validationSchemaLocale from '../../../utils/validationSchemaLocale';
import useEditItem from '../../wrappers/use-edit-item';

setLocale(validationSchemaLocale);

const formValidationSchema = object().shape({
  relation: object().shape({
    id: string().required(),
    name: string().required(),
    isNear: object().nullable().required(),
  }),
  relationIdDependences: array().nullable(),
});

const EditRelDependence = ({ item, togglerModal, onModalClose }) => {

  const { relation = {}, relationDependences = [] } = item;

  const dispatch = useDispatch();
  const [isModalOpen, openModal, closeModal, editItem] = useEditItem(editRelDependence, () => fetchRelDependences())

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

  const { editing } = useSelector(({ relations }) => relations);

  const relations = useSelector(({ relations }) => ({
    data: relations.relationsList.map(({ id, name }) => ({
      value: id,
      label: name,
    })),
    loading: relations.relationsLoading,
    error: relations.relationsError,
  }));


  const initialValues = {
    relation: {
      id: relation.id,
      name: relation.name,
      isNear: {
        value: relation.isNear,
        label: relation.isNear ? 'Ближайший' : 'Неближайший'
      },
    },
    'relationIdDependences': relationDependences.map(({ id, name }) => ({ value: id, label: name }))
  };


  useEffect(() => {
    if (!togglerModal) {
      openModal(true);
    }
    onModalClose(true)
  }, [openModal, onModalClose, item, togglerModal])

  useEffect(() => {
    dispatch(fetchRelations());
  }, [dispatch]);

  return (
    <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-relation-modal">
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
              id="edit-relation-form"
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
                <Form.Group as={Col} xs={6} controlId="relation.name">
                  <CustomField name="relation.name" label="Наименование Физ.лица" />
                </Form.Group>
                <Form.Group as={Col} xs={6}>
                  <CustomSelect
                    name="relation.isNear"
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
        <SubmitBtn variant="primary" form="edit-relation-form" text="Применить" isSubmitting={editing} />
      </Modal.Footer>
    </Modal>
  );
};

export default EditRelDependence;