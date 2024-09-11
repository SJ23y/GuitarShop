export const GuitarValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100'
  },

  description: {
    minLength: 'Minimum title length must be 20',
    maxLength: 'Maximum title length must be 1024'
  },

  articul: {
    minLength: 'Minimum title length must be 5',
    maxLength: 'Maximum title length must be 40'
  },

  date: {
    invalidFormat: 'Date should be in valid ISO format',
  },

  type: {
    wrongValue: 'The value should be of: guitar, el-guitar, ukulele'
  },

  stringsNumber: {
    wrongValue: 'The value should be of: 4, 6, 7, 12'
  },

  price: {
    value: 'Price should be in the range from 100 to 1000000'
  },

  intType: {
    type: 'Field must be an integer'
  },

  stringType: {
    type: 'Field must be a string'
  }
} as const;
