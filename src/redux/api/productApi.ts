import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Product} from '../../types/Product';
//import {PRODUCT_URL} from 'react-native-dotenv';
const PRODUCT_URL = 'https://fakestoreapi.com/';

export const productApi = createApi({
  reducerPath: 'avatar',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PRODUCT_URL}`,
  }),
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => ({
        url: 'products',
      }),
      transformResponse: (response: Product[]) => response,
    }),
  }),
});

export const {useGetProductsQuery} = productApi;
