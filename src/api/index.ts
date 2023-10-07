/**
 * API client
 */

import axios, { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from '../libs/axios';
import { Alert } from 'react-native';
import {
  FormValuesType,
  MerchantSignUpPayloadType,
  UpdateStorePayloadType,
  UpdateUserPayloadType,
  ProductPayloadType,
  ProductVariantType,
} from '@src/types';

import {
  VariantType,
  GetVariantTypeParamsType,
  GetProductsQueryParamsType,
} from '@src/types/VariantType';
// import {Asset} from 'react-native-image-picker';
// import RNBlobUtil from 'react-native-blob-util';

const normalizeError = (error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // client received an error response (5xx, 4xx)
      throw error.response.data;
    } else if (error.request) {
      // client never received a response, or request never left
      throw error.request;
    }
  }
  throw error;
};

interface UpdateProductParamsType {
  id: number;
  payload: ProductPayloadType;
}

const normalizeResponse = (response: AxiosResponse) => response.data;

/**
 * Sign Up
 * @param {object} payload -  user signup details
 */
export const signup = async (payload: { phone: string; userType: string }) => {
  try {
    const response = await axiosInstance.post(
      '/users/signup-phone-verification',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      Alert.alert('Invalid user details');
    }
  }
};

/**
 * Log In
 * @param {object} payload -  user login details
 */
export const login = (payload: { username: string; password: string }) =>
  axiosInstance
    .post('login', payload)
    .then(normalizeResponse)
    .catch(normalizeError);

export const getUserProfile = () =>
  axiosInstance.get('/users/me').then(normalizeResponse).catch(normalizeError);

export const fetchProductCategories = () =>
  axiosInstance
    .get('/product-categories')
    .then(normalizeResponse)
    .catch(normalizeError);

export const updateUser = async (payload: UpdateUserPayloadType) =>
  axiosInstance
    .put(`/users/${payload.id}`, payload.user)
    .then(normalizeResponse)
    .catch(normalizeError);

export const updateStore = async (payload: UpdateStorePayloadType) =>
  axiosInstance
    .put(`/stores/${payload.id}`, payload.store)
    .then(normalizeResponse)
    .catch(normalizeError);

export function createMerchant(formValues: FormValuesType) {
  const payload: MerchantSignUpPayloadType = {
    user: {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
    },
    store: {
      name: formValues.businessName,
      displayName: formValues.businessName,
      country: formValues.country,
      city: formValues.city,
      area: formValues.area,
      phone: formValues.phone,
      storeCategoryId: 1,
      accountType: formValues.accountType,
      tinNumber: formValues.tinNumber,
      bankName: formValues.bankName,
      bankAccountNumber: formValues.bankAccountNumber,
      bankBranch: formValues.bankBranch,
    },
  };
  return axiosInstance
    .post('/merchant-signup', payload)
    .then(normalizeResponse)
    .catch(normalizeError);
}

// export async function uploadImage(images: Asset[]) {
export async function uploadImage() {
  // const headers = {};
  try {
    // images.forEach(async image => {
    //   const res = await axiosInstance
    //     .get('/upload-image-url', {
    //       params: {
    //         fileName: image.fileName,
    //       },
    //     })
    //     .then(normalizeResponse)
    //     .catch(normalizeError);
    //   return RNBlobUtil.fetch(
    //     'PUT',
    //     res.preSignedUrl,
    //     headers,
    //     RNBlobUtil.wrap(image.uri),
    //   );
    // });
  } catch (error) {
    return error;
  }
}

export async function createProduct(payload: ProductPayloadType) {
  return axiosInstance
    .post(`/products`, payload)
    .then(normalizeResponse)
    .catch(normalizeError);
}

export async function updateProduct({ id, payload }: UpdateProductParamsType) {
  return axiosInstance
    .patch(`/products/${id}`, payload)
    .then(normalizeResponse)
    .catch(normalizeError);
}

export async function getProductById(productId: number) {
  return axiosInstance
    .get(`/products/${productId}`)
    .then(normalizeResponse)
    .catch(normalizeError);
}

export async function getProducts(queryParams: GetProductsQueryParamsType) {
  return axiosInstance
    .get(`/products`, { params: queryParams })
    .then(normalizeResponse)
    .catch(normalizeError);
}

export async function createProductWithVariants(payload: ProductPayloadType) {
  return axiosInstance
    .post(`/products/with-variants`, payload)
    .then(normalizeResponse)
    .catch(normalizeError);
}

export async function publishProduct(productId: number) {
  return axiosInstance
    .post(`/products/publish/${productId}`)
    .then(normalizeResponse)
    .catch(normalizeError);
}

export async function addVariantType(payload: VariantType) {
  return axiosInstance
    .post('/variant-types', payload)
    .then(normalizeResponse)
    .catch(normalizeError);
}

export async function updateVariantTypeValues(payload: VariantType) {
  const { id, values } = payload;
  return axiosInstance
    .post(`/variant-types/${id}`, { values })
    .then(normalizeResponse)
    .catch(normalizeError);
}

export async function getVariantTypes(queryParams: GetVariantTypeParamsType) {
  return axiosInstance
    .get(`/variant-types`, { params: queryParams })
    .then(normalizeResponse)
    .catch(normalizeError);
}

export async function getVariantTypeNames() {
  return axiosInstance
    .get(`/variant-types/names`)
    .then(normalizeResponse)
    .catch(normalizeError);
}

export async function deleteVariantType(id) {
  return axiosInstance
    .delete(`/variant-types/${id}`)
    .then(normalizeResponse)
    .catch(normalizeError);
}

export async function createProductVariant(payload: ProductVariantType) {
  return axiosInstance
    .post(`/product-variants`, payload)
    .then(normalizeResponse)
    .catch(normalizeError);
}

export async function getVariantsByProductId(productId: number) {
  return axiosInstance
    .get(`/product-variants`, { params: { productId } })
    .then(normalizeResponse)
    .catch(normalizeError);
}

export async function updateVariant({
  id,
  updates,
}: {
  id: number;
  updates: Partial<ProductVariantType>;
}) {
  return axiosInstance
    .patch(`/product-variants/${id}`, updates)
    .then(normalizeResponse)
    .catch(normalizeError);
}

export async function deleteVariant(id: number) {
  return axiosInstance
    .delete(`/product-variants/${id}`)
    .then(normalizeResponse)
    .catch(normalizeError);
}
