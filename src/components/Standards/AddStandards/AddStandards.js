import React from 'react';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { object, setLocale, date, number, array } from 'yup';
import { Formik, Field, ErrorMessage, FieldArray } from "formik";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Table } from 'react-bootstrap';

import SubmitBtn from '../../generic/SubmitBtn';
import DatePicker from '../../generic/DatePicker';
import CustomField from '../../generic/CustomField';

import { fetchStandards, addStandard } from '../../../redux/Standards/actions';
import validationSchemaLocale from '../../../utils/validationSchemaLocale';
import useAddItem from '../../wrappers/use-add-item';

import './AddStandards.scss';

setLocale(validationSchemaLocale);

const formValidationSchema = object().shape({
  dateStart: date().nullable().required(),
  standards: array().of(object().shape({
    addressId: object().nullable().required(),
    values: array().of(object().shape({
      houseTypeId: number().required(),
      value: number().required(),
    }))
  })),
  seasonId: object().nullable().required(),
  categoryId: object().nullable().required(),
});

const AddStandards = ({ housetypesList, cities, defaultCriteria = {} }) => {

  const [initialValues, setInitialValues] = React.useState({
    dateStart: null,
    standards: [],
  });
  const [defaultCriteriaValue, setDefaultCriteriaValue] = React.useState({
    categoryId: '',
    seasonId: '',
    addressId: '',
  });

  const [isModalOpen, openModal, closeModal, addItem] = useAddItem(addStandard, () => fetchStandards(defaultCriteriaValue));
  const { adding } = useSelector(({ standards }) => standards);

  const onOpen = () => {
    setDefaultCriteriaValue((prevState) => ({
      ...prevState,
      categoryId: defaultCriteria.categoryId.value,
      seasonId: defaultCriteria.seasonId.value,
      addressId: defaultCriteria.settlementsId ? defaultCriteria.settlementsId.value : defaultCriteria.citiesId.value,
    }));

    setInitialValues({
      ...initialValues,
      seasonId: {
        value: defaultCriteria.seasonId.value,
        label: defaultCriteria.seasonId.label,
      },
      categoryId: {
        value: defaultCriteria.categoryId.value,
        label: defaultCriteria.categoryId.label,
      }
    })
    openModal();
  }


  return (
    <React.Fragment>
      <Button onClick={onOpen}>Добавить</Button>
      <Modal show={isModalOpen} onHide={closeModal} size="lg" className="add-standard-modal">
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
                id="add-standard-form"
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
                <Table hover className="reference-table">
                  <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <thead className="thead-block thead-addStandards" >
                    <tr>
                      <th>№</th>
                      <th>Объекты</th>
                      {housetypesList.map(({ id, typeName }) => (
                        <th key={id}>{typeName}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={`${2 + housetypesList.length}`} className="p-0">
                        <div className="table-wrapper table-scroll">
                          <table className="table-container">
                            <colgroup>
                              <col />
                              <col />
                              <col />
                              <col />
                              <col />
                              <col />
                            </colgroup>
                            <tbody className="tBody-block tBody-addStandards">
                              {cities && cities.map(({ value, label }, index) => {

                                return (
                                  <tr key={value}>
                                    <td>{index + 1}</td>
                                    <td>{label}</td>
                                    {/* <td>
                                      <Form.Group controlId="standards">
                                        <CustomField type="number" name="standards" label="" />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      <Form.Group controlId="standards">
                                        <CustomField type="number" name="standards" label="" />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      <Form.Group controlId="standards">
                                        <CustomField type="number" name="standards" label="" />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      <Form.Group controlId="standards">
                                        <CustomField type="number" name="standards" label="" />
                                      </Form.Group>
                                    </td> */}
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table >
                <Form.Row>
                  <Form.Group as={Col} xs={4} controlId="seasonId">
                    <CustomField type="string" name="seasonId.label" label="Сезон" isDisabled />
                  </Form.Group>
                  <Form.Group as={Col} xs={4} controlId="categoryId">
                    <CustomField type="string" name="categoryId.label" label="Категория семьи" isDisabled />
                  </Form.Group>
                  <Form.Group as={Col} xs={4} controlId="dateStart">
                    <DatePicker name="dateStart" label="Дата начала" />
                  </Form.Group>
                </Form.Row>


              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>Отмена</Button>
          <SubmitBtn variant="primary" form="add-standard-form" text="Добавить" isSubmitting={adding} />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AddStandards;