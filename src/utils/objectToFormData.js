const isDateField = (field) => field instanceof Date;
const isSelectField = (field) => Object.prototype.hasOwnProperty.call(field, 'label');

const objectToFormData = (values) => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value || value === 0) {
      if (isDateField(value)) {
        formData.set(key, value.toISOString());
      } else if (typeof value === 'object' && !(value instanceof Array)) {
        if (isSelectField(value)) {
          formData.set(key, value.value);
        } else {
          Object.entries(value).forEach(([childKey, childValue]) => {
            if (childValue) {
              formData.set(`${key}.${childKey}`, childValue);
            }
          });
        }
      } else if (value instanceof Array) {
        value.forEach((it, idx) => {
          formData.set(`${key}[${idx}]`, it.value)
        })
      } else {
        formData.set(key, value);
      }
    }
  });

  return formData;
};

export default objectToFormData;
