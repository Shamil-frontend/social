const inputMasksMap = {
  date: [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/],
  tel: ['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
  // email: [/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/],
  snils: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, ' ', /\d/, /\d/],
  inn: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  pasportSerials: [/\d/, /\d/, ' ', /\d/, /\d/],
  pasportNumbers: [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
  pasportCode: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
};

export default inputMasksMap;
