export interface VariantType {
  id?: number;
  name: string;
  values: string[];
  productId?: number;
}

export interface GetVariantTypeParamsType {
  productId?: number;
  name?: string;
}

export interface GetProductsQueryParamsType {
  storeId?: number;
  page?: number;
  limit?: number;
}
