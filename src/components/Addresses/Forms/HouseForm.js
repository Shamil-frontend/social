import React from 'react';

import { toast } from 'react-toastify';
import { object, number, string, setLocale } from 'yup';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';

import CustomField from '../../generic/CustomField';

import validationSchemaLocale from '../../../utils/validationSchemaLocale';

const formValidationSchema = object().shape({
  offName: string().required(),
  houseNum: number().required(),
  houseBuild: string(),
  houseStruct: string(),
  postalCode: string(),
});

setLocale(validationSchemaLocale);

const HouseForm = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      validationSchema={formValidationSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}>
      {({ errors, handleSubmit }) => (
        <Form
          id="houses-form"
          noValidate
          onSubmit={(evt) => {
            evt.preventDefault();

            if (Object.keys(errors).length) {
              toast.error('Заполните все обязательные поля');
            }

            handleSubmit();
          }}
        >
          <Form.Group controlId="postalCode">
            <CustomField type="string" name="postalCode" label="Почтовый индекс" />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="offName">
              <CustomField type="string" name="offName" label="Наименование дома" />
            </Form.Group>
            <Form.Group as={Col} xs={6} controlId="houseNum">
              <CustomField type="number" name="houseNum" label="Номер дома" />
            </Form.Group>
            <Form.Group as={Col} xs={6} controlId="houseBuild">
              <CustomField type="string" name="houseBuild" label="Корпус" />
            </Form.Group>
            <Form.Group as={Col} xs={6} controlId="houseStruct">
              <CustomField type="string" name="houseStruct" label="Строение" />
            </Form.Group>
          </Form.Row>
        </Form>
      )}
    </Formik>
  )
}

export { HouseForm };