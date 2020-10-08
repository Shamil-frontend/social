import React from 'react';

import { toast } from 'react-toastify';
import { object, string, setLocale } from 'yup';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';

import CustomField from '../../generic/CustomField';

import validationSchemaLocale from '../../../utils/validationSchemaLocale';

const formValidationSchema = object().shape({
  offName: string().required(),
  flatNum: string().required(),
  postalCode: string(),
});

setLocale(validationSchemaLocale);

const ApartmentForm = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      validationSchema={formValidationSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}>
      {({ errors, handleSubmit }) => (
        <Form
          id="apartments-form"
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
              <CustomField type="string" name="offName" label="Наименование квартиры" />
            </Form.Group>
            <Form.Group as={Col} xs={6} controlId="flatNum">
              <CustomField type="string" name="flatNum" label="Номер квартиры" />
            </Form.Group>
          </Form.Row>
        </Form>
      )}
    </Formik>
  )
}

export { ApartmentForm };