import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { ProductCategoryType, ProductType } from '@src/types';

export const ProductCategoryFactory = Factory.define<ProductCategoryType>(
  ({ sequence }) => ({
    id: sequence,
    name: faker.commerce.productName(),
    desc: faker.lorem.word(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
);

export const ProductFactory = Factory.define<ProductType>(({ sequence }) => {
  return {
    id: sequence,
    name: faker.commerce.product(),
    desc: faker.lorem.paragraph(),
    slug: faker.string.uuid(),
    hasVariants: false,
    categoryId: faker.number.int({ max: 100 }),
    storeId: faker.number.int({ max: 100 }),
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
    deletedAt: null,
    variants: [{ inventory: { quantity: 2 } }],
  };
});
