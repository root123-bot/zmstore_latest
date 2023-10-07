import * as Yup from 'yup';

export const demographicDetailsSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too Short!').required('First name required'),
  lastName: Yup.string().min(2, 'Too Short!').required('Last name required'),
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string().min(8, 'Too Short!').required('Password required'),
});

export const merchantDetailsSchema = Yup.object().shape({
  area: Yup.string().required('Street name required'),
  city: Yup.string().required('City name required'),
  country: Yup.string().required('Country required'),
});

export const businessDetailsSchema = Yup.object().shape({
  accountType: Yup.string().required('Account required'),
  businessName: Yup.string().required('Business name required'),
  phone: Yup.string().required('Phone number required'),
  storeCategory: Yup.string().required('Store category required'),
  tinNumber: Yup.number().required('Tin number required'),
});

export const banksDetailsSchema = Yup.object().shape({
  bankName: Yup.string().required('Bank name required'),
  bankAccountNumber: Yup.string().required('Account number required'),
  bankBranch: Yup.string().required('Branch code required'),
});
