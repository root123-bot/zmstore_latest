import {
  DemographicDetailsFormValues,
  MerchantDetailsFormValues,
  BusinessDetailsFormValues,
  BankDetailsFormValues,
} from '@components/forms';

export interface UserType {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  userType: 'merchant' | 'customer' | 'staff';
  password: string;
  emailConfirmedAt: Date | null;
  emailConfirmationGeneratedAt: Date | null;
  phoneConfirmedAt: Date | null;
  phoneConfirmationGeneratedAt: Date | null;
  isSuperuser: boolean;
  recoveryToken: string | null;
  recoveryGeneratedAt: Date | null;
  recoveryTokenExpiryAt: Date | null;
  recoveryAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  storeId: number;
}

export interface UserPayloadType {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}
export interface StoreType {
  id: number;
  name: string;
  displayName: string;
  country: string;
  city: string;
  area: string;
  phone: string;
  userId: number;
  storeCategoryId: number;
  accountType: string;
  tinNumber: string;
  bankName: string;
  bankAccountNumber: string;
  bankBranch: string;
  publishAt?: Date | null;
  deactivateAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface StorePayloadType {
  name: string;
  displayName: string;
  country: string;
  city: string;
  area: string;
  phone: string;
  storeCategoryId: number;
  accountType: string;
  tinNumber: string;
  bankName: string;
  bankAccountNumber: string;
  bankBranch: string;
}

export interface ProductType {
  id: number;
  name: string;
  desc: string;
  categoryId: number;
  storeId: number;
  slug: string | null;
  publishedAt: Date | null;
  deletedAt: Date | null;
  hasVariants: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductPayloadType {
  name: string;
  desc: string;
  sku: string;
  categoryId: number;
  storeId: number;
}

interface Image {
  name: string;
  isMain: boolean;
  sequence: number;
}

interface InventoryType {
  quantity: number;
}

interface PriceType {
  amount: number;
  currency: string;
}

export interface ProductVariantType {
  productId: number;
  inventory: InventoryType;
  price: PriceType;
  variations: string;
  isDefault: boolean;
  sku: string;
  images: Image[];
  prices: PriceType[];
  inventories: InventoryType[];
}

export interface ProductCategoryType {
  id: number;
  name: string;
  desc: string;
  parentId?: number;
  ancestors?: string;
  ancestorIds?: string;
  marketing?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type profileUpdatePayloadType = Omit<
  StorePayloadType,
  'name' | 'displayName'
> &
  Omit<UserPayloadType, 'userType'>;

export interface UpdateUserPayloadType {
  id: number;
  user: Omit<UserPayloadType, 'userType'>;
}

export interface UpdateStorePayloadType {
  id: number;
  store: Omit<StorePayloadType, 'name' | 'displayName'>;
}

export interface MerchantSignUpPayloadType {
  user: UserPayloadType;
  store: StorePayloadType;
}

export type FormValueType =
  | DemographicDetailsFormValues
  | MerchantDetailsFormValues
  | BusinessDetailsFormValues
  | BankDetailsFormValues;

export type FormValuesType = DemographicDetailsFormValues &
  MerchantDetailsFormValues &
  BusinessDetailsFormValues &
  BankDetailsFormValues;

export type MerchantFormProps = {
  onSubmit?(values: FormValueType): void;
  onBack?(): void;
  onCancel?(): void;
  initialValues?: Partial<UserType & StoreType>;
};
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type PartialExcept<T, K extends keyof T> = RecursivePartial<T> &
  Pick<T, K>;
