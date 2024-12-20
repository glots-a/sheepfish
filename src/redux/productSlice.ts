import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {productApi} from './api/productApi';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {Product} from '../types/Product';

type State = {
  products: Product[] | null;
  isLoading: boolean;
  error: FetchBaseQueryError | null;
  isDarkTheme: boolean;
};

const initialState: State = {
  products: null,
  isLoading: false,
  error: null,
  isDarkTheme: true,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    swithcThemeMode: state => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    addNewProduct: (state, action) => {
      if (Array.isArray(state.products)) {
        const id = state.products.length + 1;
        const rating = {rate: 0, count: 0};
        const newItem = {...action.payload, id, rating};
        state.products = [newItem, ...state.products];
      } else {
        state.products = [
          {id: 1, rating: {rate: 0, count: 0}, ...action.payload},
        ];
      }
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(productApi.endpoints.getProducts.matchPending, state => {
        state.isLoading = true;
      })
      .addMatcher(
        productApi.endpoints.getProducts.matchFulfilled,
        (state, action) => {
          state.products = action.payload;
          state.isLoading = false;
          state.error = null;
        },
      )
      .addMatcher(
        productApi.endpoints.getProducts.matchRejected,
        (state, action: PayloadAction<FetchBaseQueryError | undefined>) => {
          if (action.payload) {
            state.error = action.payload;
          } else {
            state.error = {
              status: 'FETCH_ERROR',
              error: 'Unknown error occurred',
            } as FetchBaseQueryError;
          }
          state.isLoading = false;
        },
      );
  },
});

export default productSlice.reducer;
export const {swithcThemeMode, addNewProduct} = productSlice.actions;
