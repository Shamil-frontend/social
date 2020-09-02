const validationSchemaLocale = {
  mixed: {
    required: 'Обязательное поле',
  },
  string: {
    min: (min) => `Поле должно состоять минимум из ${min} символов`,
    email: 'Невалидный e-mail',
  },
  number: {
    min: (min) => `Значение поля должно быть не менее ${min}`,
    max: (max) => `Значение поля должно быть не более ${max}`,
  },
};

export default validationSchemaLocale;
