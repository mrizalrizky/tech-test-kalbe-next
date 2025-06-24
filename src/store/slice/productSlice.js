import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productsApi } from "@/services/productService";

const initialState = {
  products: [],
  currentProduct: null,
  isLoading: false,
  error: null,
};

export const fetchAllProducts = createAsyncThunk(
  "products/getAllProductss",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productsApi.getAllProducts();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productsApi.getProductById();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (bodyData, { rejectWithValue, dispatch }) => {
    try {
      const response = await productsApi.createProduct(bodyData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductById = createAsyncThunk(
  "products/updateProductById",
  async (bodyData, { rejectWithValue }) => {
    try {
      const { uuid, data } = bodyData;
      const response = await productsApi.updateProductById(uuid, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductById = createAsyncThunk(
  "products/deleteProductById",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await productsApi.deleteProductById(id);
      // dispatch(fetchAllProducts());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true;
      state.products = initialStatestate.products;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = initialStatestate.products;
      state.error = action.payload;
    });
    builder.addCase(fetchProductById.pending, (state) => {
      state.isLoading = true;
      state.currentProduct = initialState.currentProduct;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentProduct = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.currentProduct = initialState.currentProduct;
      state.error = action.payload;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentProduct = action.payload;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.currentProduct = initialState.currentProduct;
      state.error = action.payload;
    });
    builder.addCase(updateProductById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentProduct = action.payload;
    });
    builder.addCase(updateProductById.rejected, (state, action) => {
      state.isLoading = false;
      // state.currentProduct = initialState.currentProduct;
      state.error = action.payload;
    });
    builder.addCase(deleteProductById.pending, (state) => {
      state.isLoading = true;
      state.products = initialStatestate.products;
    });
    builder.addCase(deleteProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(deleteProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.products = initialStatestate.products;
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
