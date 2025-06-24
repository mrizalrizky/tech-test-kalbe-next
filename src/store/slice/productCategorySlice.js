import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productCategoriesApi } from "@/services/productCategoryService";

const initialState = {
  categories: [],
  currentCategory: null,
  isLoading: false,
  error: null,
};

export const fetchAllProductCategories = createAsyncThunk(
  "productCategory/getAllProductCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productCategoriesApi.getAllProductCategories();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductCategoryById = createAsyncThunk(
  "productCategory/getProductCategoryById",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productCategoriesApi.getProductCategoryById();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProductCategory = createAsyncThunk(
  "productCategory/createProductCategor",
  async (bodyData, { rejectWithValue, dispatch }) => {
    try {
      const response = await productCategoriesApi.createProductCategory(
        bodyData
      );
      // dispatch(fetchAllClients());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductCategoryById = createAsyncThunk(
  "productCategory/updateProductCategoryById",
  async (bodyData, { rejectWithValue }) => {
    try {
      const { id, data } = bodyData;
      const response = await productCategoriesApi.updateProductCategoryById(
        id,
        data
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductCategoryById = createAsyncThunk(
  "productCategory/deleteProductCategoryById",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await productCategoriesApi.deleteProductCategoryById(
        categoryId
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const productCategorySlice = createSlice({
  name: "productCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductCategories.pending, (state) => {
      state.isLoading = true;
      state.categories = initialState.categories;
    });
    builder.addCase(fetchAllProductCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchAllProductCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.categories = initialState.categories;
      state.error = action.payload;
    });
    builder.addCase(fetchProductCategoryById.pending, (state) => {
      state.isLoading = true;
      state.currentCategory = initialState.currentCategory;
    });
    builder.addCase(fetchProductCategoryById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentCategory = action.payload;
    });
    builder.addCase(fetchProductCategoryById.rejected, (state, action) => {
      state.isLoading = false;
      state.currentCategory = initialState.currentCategory;
      state.error = action.payload;
    });
    builder.addCase(createProductCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProductCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentCategory = action.payload;
    });
    builder.addCase(createProductCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.currentCategory = initialState.currentCategory;
      state.error = action.payload;
    });
    builder.addCase(updateProductCategoryById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProductCategoryById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentCategory = action.payload;
    });
    builder.addCase(updateProductCategoryById.rejected, (state, action) => {
      state.isLoading = false;
      state.currentCategory = action.payload;
      state.error = action.payload;
    });
    builder.addCase(deleteProductCategoryById.pending, (state) => {
      state.isLoading = true;
      state.categories = initialState.categories;
    });
    builder.addCase(deleteProductCategoryById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(deleteProductCategoryById.rejected, (state, action) => {
      state.isLoading = false;
      state.categories = initialState.categories;
      state.error = action.payload;
    });
  },
});

export default productCategorySlice.reducer;
