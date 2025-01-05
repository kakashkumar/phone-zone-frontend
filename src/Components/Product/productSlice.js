import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Services/api";

export const getProducts = createAsyncThunk(
    "productSlice/getProducts",
    async () => {
      const response = api.product.getProducts()
      return response;
    }
  );

  export const updateProduct = createAsyncThunk(
    "productSlice/updateProduct",
    async (data) => {        
      const response = api.product.updateProduct(data)
      return response;
    }
  );

  export const getProduct = createAsyncThunk(
    "productSlice/getProduct",
    async (data) => {
      const response = api.product.getProduct(data)
      return response;
    }
  );

  export const getProductsById = createAsyncThunk(
    "productSlice/getProductsById",
    async (data) => {
        console.log(data, 'data');
        
      const response = api.product.getProductsById(data)
      return response;
    }
  );

  export const deleteProduct = createAsyncThunk(
    "productSlice/deleteProduct",
    async (data) => {
        
      const response = api.product.deleteProduct(data)
      return response;
    }
  );

const initialState = {
    getProductsLoading: false,
    getProductsData: [],
    getProductsError: "",
    updateProductStockLoading:false,
    updateProductStockData: {},
    updateProductStockError: "",
    productLoading : false,
    productData : {},
    productError : "",
    getProductsByIdLoading : false,
    getProductsByIdData : [],
    getProductsByIdError : "",
    deleteProductLoading: false,
    deleteProductData : {},
    deleteProductError : ""
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // get products
      .addCase(getProducts.pending, (state) => {
        state.getProductsLoading = true;
        state.getProductsError = "";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.getProductsLoading = false;
        state.getProductsData = action?.payload?.data;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.getProductsLoading = false;
        state.getProductsData = action?.payload?.data;
        state.getProductsError = action?.error.message;
      })
    // update Product
    .addCase(updateProduct.pending, (state) => {
        state.updateProductStockLoading = true;
        state.updateProductStockError = "";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateProductStockLoading = false;
        state.updateProductStockData = action?.payload?.data;
        
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProductStockLoading = false;
        state.updateProductStockData = action?.payload?.data;
        state.updateProductStockError = action?.error.message;
      })
      // get product
    .addCase(getProduct.pending, (state) => {
        state.productLoading = true;
        state.productError = "";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productData = action?.payload?.data;
        
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.productLoading = false;
        state.productData = action?.payload?.data;
        state.productError = action?.error.message;
      })
            // get products by ids
    .addCase(getProductsById.pending, (state) => {
        state.getProductsByIdLoading = true;
        state.getProductsByIdError = "";
      })
      .addCase(getProductsById.fulfilled, (state, action) => {
        state.getProductsByIdLoading = false;
        state.getProductsByIdData = action?.payload?.data;
        
      })
      .addCase(getProductsById.rejected, (state, action) => {
        state.getProductsByIdLoading = false;
        state.getProductsByIdData = action?.payload?.data;
        state.getProductsByIdError = action?.error.message;
      })
      // delete product
    .addCase(deleteProduct.pending, (state) => {
      state.deleteProductLoading = true;
      state.deleteProductError = "";
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.deleteProductLoading = false;
      state.deleteProductData = action?.payload?.data;
      
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.deleteProductLoading = false;
      state.deleteProductData = action?.payload?.data;
      state.deleteProductError = action?.error.message;
    })
  }
})

const { actions, reducer: productReducer } = productSlice;

export default productReducer;