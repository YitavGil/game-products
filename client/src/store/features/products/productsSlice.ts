// src/store/features/products/productsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCategory } from '@/types';

export interface ProductsState {
  filters: {
    search: string;
    category: ProductCategory | '';
    minPrice: number | '';
    maxPrice: number | '';
  };
}

const initialState: ProductsState = {
  filters: {
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  },
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<ProductCategory | ''>) => {
      state.filters.category = action.payload;
    },
    setPriceFilter: (state, action: PayloadAction<{ min: number | ''; max: number | '' }>) => {
      state.filters.minPrice = action.payload.min;
      state.filters.maxPrice = action.payload.max;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setSearchFilter, setCategoryFilter, setPriceFilter, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;