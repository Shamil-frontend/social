const inputMasksMap = {
  date: [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/],
  tel: ['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
  snils: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, ' ', /\d/, /\d/],
  inn: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  pasportSerials: [/\d/, /\d/, ' ', /\d/, /\d/],
  pasportNumbers: [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
  pasportCode: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
};

export default inputMasksMap;
