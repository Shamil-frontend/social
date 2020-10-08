import React, { useEffect } from 'react';
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
import { fetchJobpositions, editJobposition } from '../../../redux/Jobpositions/actions';
import useEditItem from '../../wrappers/use-edit-item';

setLocale(validationSchemaLocale);

const formValidationSchema = object().shape({
  id: string().required(),
  name: string().required(),
});

const EditJobpositions = ({ item, togglerModal, onModalClose }) => {
  const [isModalOpen, openModal, closeModal, editItem] = useEditItem(editJobposition, () => fetchJobpositions())

  const { editing } = useSelector(({ jobpositions }) => jobpositions);

  const initialValues = {
    id: item.id,
    name: item.name,
  };


  useEffect(() => {
    if (!togglerModal) {
      openModal(true);
    }
    onModalClose(true)
  }, [openModal, onModalClose, item, togglerModal])


  return (
    <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-jopPos-modal">
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
              id="edit-jobposition-form"
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
        <SubmitBtn variant="primary" form="edit-jobposition-form" text="Применить" isSubmitting={editing} />
      </Modal.Footer>
    </Modal>
  );
};

export default EditJobpositions;