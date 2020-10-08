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

import { fetchRoles, fetchEmployees, addEmployee } from '../../../redux/Employees/actions';
import { fetchOrgstructures } from '../../../redux/Orgstructures/actions';
import { fetchJobpositions } from '../../../redux/Jobpositions/actions';
import validationSchemaLocale from '../../../utils/validationSchemaLocale';
import useAddItem from '../../wrappers/use-add-item';

import './AddEmployees.scss';

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

const initialValues = {
  orgStructureId: null,
  jobPositionId: null,
  // fio: {
  //   lastName: '',
  //   firstName: '',
  //   middleName: ''
  // },
  fio: '',
  phoneNumber1: '',
  phoneNumber2: '',
  email: '',
  login: '',
  password: '',
  isActive: null,
  comment: '',
  roleId: null,
};

// {
//   "id": "6c7a1958-1386-4a8b-8e5e-9e390ed2a9df",
//   "jobPositionId": "9463785a-14a2-4f1a-aba4-379523121f95",
//   "jobPosition": "Директор",
//   "orgStructureName": "Отдел разработки ПО",
//   "orgStructureId": "fcfa5238-d075-492b-852d-9360a9409776",
//   "roleId": 2,
//   "roleName": "Programmer",
//   "fio": "Зинедин Зидан",
//   "phoneNumber1": "9880003322",
//   "phoneNumber2": "32132131232",
//   "email": "sd@sd.sd",
//   "isActive": true,
//   "login": "eldorado"
// }

const AddEmployees = () => {

  const dispatch = useDispatch();
  const [isModalOpen, openModal, closeModal, addItem] = useAddItem(addEmployee, () => fetchEmployees());

  const statusEmployee = [
    {
      value: true,
      label: 'Активен'
    },
    {
      value: false,
      label: 'Неактивен'
    }
  ]

  const { adding } = useSelector(({ employees }) => employees);

  const employees = useSelector(({ employees }) => ({
    data: employees.rolesList.map(({ id, nameRus }) => ({
      value: id,
      label: nameRus,
    })),
    loading: employees.rolesLoading,
    error: employees.rolesError,
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



  useEffect(() => {
    dispatch(fetchOrgstructures());
    dispatch(fetchJobpositions());
    dispatch(fetchRoles());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Button onClick={openModal}>Добавить</Button>
      <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-employee-modal">
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
                id="add-employee-form"
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
                      data={employees.data}
                      isLoading={employees.loading}
                      isDisabled={employees.error}
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
                      label="Запасной телефон:"
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
          <SubmitBtn variant="primary" form="add-employee-form" text="Добавить" isSubmitting={adding} />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AddEmployees;