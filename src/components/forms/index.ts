export * from './bank-details';
export * from './business-details';
export * from './demographic-details';
export * from './merchant-details';

export const testUser = {
  firstName: 'peter',
  lastName: 'mecar',
  userType: 'merchant' as 'merchant' | 'customer' | 'staff',
  email: 'mecarito8@gmail.com',
  phone: null,
  password: '@123abcdef',
  emailConfirmedAt: null,
  emailConfirmationGeneratedAt: null,
  phoneConfirmedAt: null,
  phoneConfirmationGeneratedAt: null,
  recoveryToken: null,
  recoveryGeneratedAt: null,
  recoveryTokenExpiryAt: null,
  recoveryAt: null,
  id: 1,
  isSuperuser: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const testStore = {
  name: 'GSM6',
  displayName: 'GSM',
  country: 'Tanzania',
  city: 'Dar es salaam',
  area: 'Kinondoni',
  phone: '+255767885334',
  userId: 3,
  storeCategoryId: 1,
  accountType: 'Individual',
  tinNumber: '015df34',
  bankName: 'CRDB',
  bankAccountNumber: '0154855ww2445',
  bankBranch: 'Kariakoo',
  publishAt: null,
  deactivateAt: null,
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
