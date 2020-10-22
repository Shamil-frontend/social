import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { object, string, setLocale } from 'yup';
import { Formik } from 'formik';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Col, InputGroup } from 'react-bootstrap';

import CustomSelect from '../../generic/CustomSelect';
import CustomField from '../../generic/CustomField';
import SubmitBtn from '../../generic/SubmitBtn/SubmitBtn';

import { fetchEmployees, editEmployee } from '../../../redux/Employees/actions';
import { fetchOrgstructures } from '../../../redux/Orgstructures/actions';
import { fetchJobpositions } from '../../../redux/Jobpositions/actions';
import { fetchRoles } from '../../../redux/Roles/actions';
import validationSchemaLocale from '../../../utils/validationSchemaLocale';
import useEditItem from '../../wrappers/use-edit-item';

setLocale(validationSchemaLocale);

const formValidationSchema = object().shape({
  orgStructureId: object().nullable().required(),
  jobPositionId: object().nullable().required(),
  // fio: object().shape({
  //   lastName: string().required(),
  //   firstName: string().required(),
  //   middleName: string().required()
  // }),
  fio: string().required(),
  phoneNumber1: string().required(),
  phoneNumber2: string(),
  email: string().email(),
  login: string().required(),
  password: string().required(),
  isActive: object().nullable().required(),
  comment: string(),
  roleId: object().nullable().required(),
});

const EditEmployees = ({ item, togglerModal, onModalClose }) => {

  const dispatch = useDispatch();
  const [isModalOpen, openModal, closeModal, editItem] = useEditItem(editEmployee, () => fetchEmployees())

  const statusEmployee = [
    {
      value: true,
      label: 'Активен'
    },
    {
      value: false,
      label: 'Неактивен'
    }
  ];

  const { editing } = useSelector(({ employees }) => employees);

  const roles = useSelector(({ roles }) => ({
    data: roles.rolesList.map(({ id, nameRus }) => ({
      value: id,
      label: nameRus,
    })),
    loading: roles.rolesLoading,
    error: roles.rolesError,
  }));

  const orgstructures = useSelector(({ orgstructures }) => ({
    data: orgstructures.orgstructuresList.map(({ id, name }) => ({
      value: id,
      label: name,
    })),
    loading: orgstructures.loading,
    error: orgstructures.error,
  }));

  const jobpositions = useSelector(({ jobpositions }) => ({
    data: jobpositions.jobpositionsList.map(({ id, name }) => ({
      value: id,
      label: name,
    })),
    loading: jobpositions.loading,
    error: jobpositions.error,
  }));

  const initialValues = {
    orgStructureId: {
      value: item.orgStructureId,
      label: item.orgStructureName
    },
    jobPositionId: {
      value: item.jobPositionId,
      label: item.jobPosition
    },
    // fio: {
    //   lastName: '',
    //   firstName: '',
    //   middleName: ''
    // },
    fio: item.fio,
    phoneNumber1: item.phoneNumber1,
    phoneNumber2: item.phoneNumber2,
    email: item.email,
    login: item.login,
    password: item.password,
    isActive: {
      value: item.isActive,
      label: item.isActive ? "Активный" : "Неактивный"
    },
    comment: item.comment,
    roleId: {
      value: item.roleId,
      label: item.roleName
    },
  };


  useEffect(() => {
    if (!togglerModal) {
      openModal(true);
    }
    onModalClose(true)
  }, [openModal, onModalClose, item, togglerModal])

  useEffect(() => {
    dispatch(fetchOrgstructures());
    dispatch(fetchJobpositions());
    dispatch(fetchRoles());
  }, [dispatch]);

  return (
    <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-employee-modal">
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
              id="edit-employee-form"
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
              <Form.Group controlId="fio">
                <CustomField name="fio" label="ФИО сотрудника" />
              </Form.Group>
              {/* <Form.Row>
                  <Form.Group as={Col} md={4} controlId="fio.lastName">
                    <CustomField name="fio.lastName" label="Фамилия" />
                  </Form.Group>
                  <Form.Group as={Col} md={4} controlId="fio.firstName">
                    <CustomField name="fio.firstName" label="Имя" />
                  </Form.Group>
                  <Form.Group as={Col} md={4} controlId="fio.middleName">
                    <CustomField name="fio.middleName" label="Отчество" />
                  </Form.Group>
                </Form.Row> */}
              <Form.Row>
                <Form.Group as={Col} xs={6}>
                  <CustomSelect
                    name="orgStructureId"
                    placeholder="Орг. структура"
                    label="Орг. структура"
                    data={orgstructures.data}
                    isLoading={orgstructures.loading}
                    isDisabled={orgstructures.error}
                  />
                </Form.Group>
                <Form.Group as={Col} xs={6}>
                  <CustomSelect
                    name="jobPositionId"
                    placeholder="Должность сотрудника"
                    label="Должность сотрудника"
                    data={jobpositions.data}
                    isLoading={jobpositions.loading}
                    isDisabled={jobpositions.error}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} xs={6}>
                  <CustomSelect
                    name="roleId"
                    placeholder="Роль сотрудника"
                    label="Роль сотрудника"
                    data={roles.data}
                    isLoading={roles.loading}
                    isDisabled={roles.error}
                  />
                </Form.Group>
                <Form.Group as={Col} xs={6}>
                  <CustomSelect
                    name="isActive"
                    placeholder="Статус сотрудника"
                    label="Статус сотрудника"
                    data={statusEmployee}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="email">
                <CustomField type="string" name="email" label="Email" />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col} xs={6} controlId="login">
                  <CustomField type="string" name="login" label="Логин сотрудника" />
                </Form.Group>
                <Form.Group as={Col} xs={6} controlId="password">
                  <CustomField type="string" name="password" label="Пароль" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} xs={6} controlId="phoneNumber1">
                  <CustomField
                    type="string"
                    name="phoneNumber1"
                    label="Основной телефон"
                    mask="tel" />
                </Form.Group>
                <Form.Group as={Col} xs={6} controlId="phoneNumber2">
                  <CustomField
                    type="string"
                    name="phoneNumber2"
                    label="Дополнительный телефон:"
                    mask="tel" />
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="comment">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Комментарий</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control as="textarea" name="comment" maxLength="270" rows="3" style={{ resize: 'none' }} />
                </InputGroup>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={closeModal}>Отмена</Button>
        <SubmitBtn variant="primary" form="edit-employee-form" text="Применить" isSubmitting={editing} />
      </Modal.Footer>
    </Modal>
  );
};

export default EditEmployees;