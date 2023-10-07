// inspiration https://tkdodo.eu/blog/effective-react-query-keys

import { GetProductsQueryParamsType } from '@src/types/VariantType';

export const userKeys = {
  all: ['users'] as const,
  me: () => [...userKeys.all, 'me'] as const,
};

export const productCategoriesKeys = {
  all: ['product-categories'] as const,
};

export const productKeys = {
  all: ['products'] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: GetProductsQueryParamsType) =>
    [...productKeys.lists(), { filters }] as const,
};

export const variantTypesKeys = {
  all: ['variant-types'] as const,
  lists: () => [...variantTypesKeys.all, 'list'] as const,
  list: filters => [...variantTypesKeys.lists(), { filters }] as const,
  names: () => [...variantTypesKeys.all, 'names'] as const,
};

export const variantKeys = {
  all: ['variants'] as const,
  details: () => [...variantKeys.all, 'detail'] as const,
  detail: (id: number) => [...variantKeys.details(), id] as const,
  lists: () => [...variantKeys.all, 'list'] as const,
  list: filters => [...variantKeys.lists(), { filters }] as const,
};
