import React from 'react';
import { render, screen, fireEvent, waitFor, asMock } from '@utils/testUtils';
import { BasicInfoForm } from './BasicInfoForm';
import { strings } from '@i18n';
import { ProductCategoryFactory, ProductFactory } from '@utils/factories';
import axios from 'axios';

// let mockAuthUser = {storeId: 2}
const STORE_ID = 2;
jest.mock('@src/context/AuthContext', () => ({
  useAuth: jest.fn(() => ({
    authUser: { storeId: STORE_ID },
  })),
}));

describe('BasicInfoForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render and submit a default form', async () => {
    const categories = ProductCategoryFactory.buildList(3);

    const Get = asMock(axios.get);
    Get.mockImplementation(async path => {
      switch (path) {
        case '/product-categories':
          return { data: categories };
        default:
          return { data: null };
      }
    });
    const handleSubmitSuccess = jest.fn();
    render(<BasicInfoForm onSubmitSuccess={handleSubmitSuccess} />);
    expect(
      await screen.findByPlaceholderText(
        strings.add_product.form.name_placeholder,
      ),
    ).toBeOnTheScreen();
    expect(
      screen.getByPlaceholderText(
        strings.add_product.form.category_placeholder,
      ),
    ).toBeOnTheScreen();
    expect(
      screen.getByPlaceholderText(
        strings.add_product.form.description_placeholder,
      ),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(strings.add_product.form.variations_label),
    ).toBeOnTheScreen();
    const radios = screen.getAllByRole('radio');
    expect(radios.length).toBe(2);
    expect(radios[0].props.accessibilityState.checked).toBeFalsy();
    expect(radios[1].props.accessibilityState.checked).toBeTruthy();
    expect(
      screen.getByPlaceholderText(strings.add_product.form.sku_placeholder),
    ).toBeOnTheScreen();
    expect(
      screen.getByPlaceholderText(
        strings.add_product.form.quantity_placeholder,
      ),
    ).toBeOnTheScreen();
    expect(
      screen.getByPlaceholderText(
        strings.add_product.form.price_amount_placeholder,
      ),
    ).toBeOnTheScreen();
    // try to submit when form fields are empty should show error messages
    fireEvent.press(screen.getByText(strings.general.save_btn_text));
    expect(
      await screen.findByText(strings.add_product.form.name_required),
    ).toBeOnTheScreen();
    // expect(screen.getByText(strings.add_product.form.category_required)).toBeOnTheScreen()
    expect(
      screen.getByText(strings.add_product.form.sku_required),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(strings.add_product.form.quantity_required),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(strings.add_product.form.price_amount_required),
    ).toBeOnTheScreen();
    // fill the form properly should allow it to be submitted
    const Post = asMock(axios.post);
    const responseBody = { id: 1 };
    Post.mockResolvedValueOnce({ data: responseBody });
    await waitFor(() => {
      // https://stackoverflow.com/questions/65753374/react-native-test-failed-when-using-formik-and-yup-as-validation-schema
      fireEvent.changeText(
        screen.getByPlaceholderText(strings.add_product.form.name_placeholder),
        'New Value',
      );
    });
    fireEvent.press(
      screen.getByPlaceholderText(
        strings.add_product.form.category_placeholder,
      ),
    );
    await waitFor(() => {
      fireEvent.press(screen.getByText(categories[1].name));
    });
    await waitFor(() => {
      fireEvent.changeText(
        screen.getByPlaceholderText(strings.add_product.form.sku_placeholder),
        'New SKU',
      );
    });
    await waitFor(() => {
      fireEvent.changeText(
        screen.getByPlaceholderText(
          strings.add_product.form.quantity_placeholder,
        ),
        '10',
      );
    });
    await waitFor(() => {
      fireEvent.changeText(
        screen.getByPlaceholderText(
          strings.add_product.form.price_amount_placeholder,
        ),
        '10000',
      );
    });
    await waitFor(() => {
      fireEvent.press(screen.getByText(strings.general.save_btn_text));
    });
    expect(Post).toHaveBeenCalledWith('/products', {
      name: 'New Value',
      desc: '',
      inventory: { quantity: '10' },
      price: { amount: '10000', currency: 'TZS' },
      sku: 'New SKU',
      categoryId: categories[1].id,
      storeId: STORE_ID,
    });
    expect(handleSubmitSuccess).toHaveBeenCalledWith(responseBody);
  });

  it('should be able to submit product with variants', async () => {
    const categories = ProductCategoryFactory.buildList(3);

    const Get = asMock(axios.get);
    Get.mockImplementation(async path => {
      switch (path) {
        case '/product-categories':
          return { data: categories };
        default:
          return { data: null };
      }
    });
    const handleSubmitSuccess = jest.fn();
    render(<BasicInfoForm onSubmitSuccess={handleSubmitSuccess} />);

    const Post = asMock(axios.post);
    const responseBody = { id: 1 };
    Post.mockResolvedValueOnce({ data: responseBody });
    await waitFor(() => {
      // https://stackoverflow.com/questions/65753374/react-native-test-failed-when-using-formik-and-yup-as-validation-schema
      fireEvent.changeText(
        screen.getByPlaceholderText(strings.add_product.form.name_placeholder),
        'New Value',
      );
    });
    fireEvent.press(
      screen.getByPlaceholderText(
        strings.add_product.form.category_placeholder,
      ),
    );
    await waitFor(() => {
      fireEvent.press(screen.getByText(categories[1].name));
    });
    const radios = screen.getAllByRole('radio');
    await waitFor(() => {
      fireEvent.press(radios[0]);
    });
    await waitFor(() => {
      fireEvent.press(screen.getByText(strings.general.save_btn_text));
    });
    expect(Post).toHaveBeenCalledWith('/products/with-variants', {
      name: 'New Value',
      desc: '',
      categoryId: categories[1].id,
      storeId: STORE_ID,
      hasVariants: true,
    });
    expect(handleSubmitSuccess).toHaveBeenCalledWith(responseBody);
  });

  it('should be able to edit product', async () => {
    const categories = ProductCategoryFactory.buildList(3);
    const product = ProductFactory.build({ hasVariants: true });

    const Get = asMock(axios.get);
    Get.mockImplementation(async path => {
      switch (path) {
        case '/product-categories':
          return { data: categories };
        case `/products/${product.id}`:
          return { data: product };
        default:
          return { data: null };
      }
    });
    render(<BasicInfoForm productId={product.id} />);
    const nameField = await screen.findByPlaceholderText(
      strings.add_product.form.name_placeholder,
    );
    expect(nameField).toBeOnTheScreen();
    expect(nameField.props.value).toBe(product.name);

    const radios = screen.getAllByRole('radio');
    expect(radios.length).toBe(2);
    expect(radios[0].props.accessibilityState.checked).toBeTruthy();
    expect(radios[1].props.accessibilityState.checked).toBeFalsy();

    const Patch = asMock(axios.patch);
    const responseBody = { id: 1 };
    Patch.mockResolvedValueOnce({ data: responseBody });
    await waitFor(() => {
      // https://stackoverflow.com/questions/65753374/react-native-test-failed-when-using-formik-and-yup-as-validation-schema
      fireEvent.changeText(
        screen.getByPlaceholderText(strings.add_product.form.name_placeholder),
        'New Value',
      );
    });
    await waitFor(() => {
      fireEvent.press(screen.getByText(strings.general.update_btn_text));
    });
    expect(Patch).toHaveBeenCalled();
  });
});
