import React from 'react';

import { toast } from 'react-toastify';
import { object, string, setLocale } from 'yup';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';

import CustomField from '../../generic/CustomField';

import validationSchemaLocale from '../../../utils/validationSchemaLocale';

const formValidationSchema = object().shape({
  offName: string().required(),
  postalCode: string(),
});

setLocale(validationSchemaLocale);

const StreetForm = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      validationSchema={formValidationSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}>
      {({ errors, handleSubmit }) => (
        <Form
          id="streets-form"
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
          <Form.Group controlId="offName">
            <CustomField type="string" name="offName" label="Наименование улицы" />
          </Form.Group>
        </Form>
      )}
    </Formik>
  )
}

export { StreetForm };