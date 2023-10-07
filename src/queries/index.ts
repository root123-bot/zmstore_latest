import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createMerchant,
  fetchProductCategories,
  getUserProfile,
  login,
  updateStore,
  updateUser,
  uploadImage,
  createProduct,
  createProductVariant,
  publishProduct,
  createProductWithVariants,
  getProductById,
  updateProduct,
  addVariantType,
  getVariantTypes,
  updateVariantTypeValues,
  getVariantsByProductId,
  updateVariant,
  deleteVariant,
  getVariantTypeNames,
  deleteVariantType,
  getProducts,
} from '@api';
import {
  userKeys,
  productCategoriesKeys,
  productKeys,
  variantTypesKeys,
  variantKeys,
} from './keys';
import {
  GetProductsQueryParamsType,
  GetVariantTypeParamsType,
} from '@src/types/VariantType';

export const useMerchantSignUp = () =>
  useMutation({
    mutationFn: createMerchant,
  });

export const useUserUpdate = () =>
  useMutation({
    mutationFn: updateUser,
  });

export const useStoreUpdate = () =>
  useMutation({
    mutationFn: updateStore,
  });

export const useGetProductCategories = (options = {}) =>
  useQuery({
    queryKey: productCategoriesKeys.all,
    queryFn: fetchProductCategories,
    ...options,
  });

export const useGetMe = (options = {}) =>
  useQuery({
    queryKey: userKeys.me(),
    queryFn: getUserProfile,
    ...options,
  });

export const useUpload = () =>
  useMutation({
    mutationFn: uploadImage,
  });

export const useCreateProduct = () =>
  useMutation({
    mutationFn: createProduct,
  });

export const useUpdateProduct = () =>
  useMutation({
    mutationFn: updateProduct,
  });

export const useCreateProductVariant = () =>
  useMutation({
    mutationFn: createProductVariant,
  });

export const usePublishProduct = () =>
  useMutation({
    mutationFn: publishProduct,
  });

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });

export const useCreateProductWithVariants = () =>
  useMutation({
    mutationFn: createProductWithVariants,
  });

export const useGetProductById = (id: number) =>
  useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => getProductById(id),
    enabled: !!id,
  });

export const useGetProducts = (filters: GetProductsQueryParamsType) =>
  useQuery({
    queryKey: productKeys.list(filters),
    queryFn: async () => getProducts(filters),
  });

export const useCreateVariantType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addVariantType,
    onSuccess: async data => {
      await queryClient.invalidateQueries({
        queryKey: variantTypesKeys.list({ productId: data.productId }),
      });
      await queryClient.invalidateQueries({
        queryKey: variantKeys.detail(data.productId),
      });
    },
  });
};

export const useUpdateVariantType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateVariantTypeValues,
    onSuccess: data => {
      return queryClient.invalidateQueries({
        queryKey: variantTypesKeys.list({ productId: data.productId }),
      });
    },
  });
};

export const useGetVariantTypes = (filters: GetVariantTypeParamsType) => {
  return useQuery({
    queryKey: variantTypesKeys.list(filters),
    queryFn: () => getVariantTypes(filters),
    enabled: filters && !!filters.productId,
  });
};

export const useGetProductVariantsByProductId = (id: number) =>
  useQuery({
    queryKey: variantKeys.list({ productId: id }),
    queryFn: async () => getVariantsByProductId(id),
    enabled: !!id,
  });

export const useUpdateVariant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateVariant,
    onSuccess: data => {
      return queryClient.invalidateQueries({
        queryKey: variantKeys.list({ productId: data.productId }),
      });
    },
  });
};

export const useDeleteVariant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVariant,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: variantKeys.lists() });
    },
  });
};

export const useGetVariantTypeNames = () => {
  return useQuery({
    queryKey: variantTypesKeys.names(),
    queryFn: () => getVariantTypeNames(),
  });
};

export const useDeleteVariantType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVariantType,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: variantTypesKeys.lists(),
      });
      await queryClient.invalidateQueries({ queryKey: variantKeys.lists() });
    },
  });
};
