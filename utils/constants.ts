export const passwordValidations = [
    {
      name: 'At least 8 characters',
      regExp: '.{8,}',
    },
    {
      name: 'At least 1 number',
      regExp: '.*[0-9].*',
    },
    {
      name: 'At least 1 punctuation character',
      regExp: '.*[^A-Za-z0-9].*',
    },
    {
      name: 'At least 1 uppercase character',
      regExp: '.*[A-Z].*',
    },
    {
      name: 'At least 1 lowercase character',
      regExp: '.*[a-z].*',
    },
];