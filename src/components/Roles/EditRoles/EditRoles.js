import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { object, string, number, setLocale } from 'yup';
import { Formik } from 'formik';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Col } from 'react-bootstrap';
import CustomField from '../../generic/CustomField';
import SubmitBtn from '../../generic/SubmitBtn/SubmitBtn';

import { fetchRoles, editRole } from '../../../redux/Roles/actions';
import validationSchemaLocale from '../../../utils/validationSchemaLocale';
import useEditItem from '../../wrappers/use-edit-item';

setLocale(validationSchemaLocale);

const formValidationSchema = object().shape({
  id: number().required(),
  name: string().required(),
  nameRus: string().required(),
  rang: string().required(),
});

const EditRoles = ({ item, togglerModal, onModalClose }) => {

  const [isModalOpen, openModal, closeModal, editItem] = useEditItem(editRole, () => fetchRoles());

  const { editing } = useSelector(({ roles }) => roles);

  const initialValues = {
    id: item.id,
    name: item.name,
    nameRus: item.nameRus,
    rang: item.rang,
  };

  useEffect(() => {
    if (!togglerModal) {
      openModal(true);
    }
    onModalClose(true)
  }, [openModal, onModalClose, item, togglerModal])

  return (
    <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-role-modal">
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
              id="edit-role-form"
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
        <SubmitBtn variant="primary" form="edit-role-form" text="Применить" isSubmitting={editing} />
      </Modal.Footer>
    </Modal>
  );
};

export default EditRoles;