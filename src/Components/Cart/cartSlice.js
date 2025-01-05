import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Services/api";

export const getCartItems = createAsyncThunk(
    "getSlice/getCartItems",
    async () => {
      const response = api.cart.getCartItems()
      return response;
    }
  );

  export const addCartItems = createAsyncThunk(
    "cartSlice/addCartItems",
    async (data) => {        
      const response = api.cart.addCartItems(data)
      return response;
    }
  );

  export const deleteCartItem = createAsyncThunk(
    "cartSlice/deleteCartItem",
    async (data) => {        
      const response = api.cart.deleteCartItem(data)
      return response;
    }
  );

  export const updateCartItemQuantity = createAsyncThunk(
    "cartSlice/updateCartItemQuantity",
    async (data) => {        
      const response = api.cart.updateCartItemQuantity(data)
      return response;
    }
  );


const initialState = {
    getCartItemsLoading: false,
    getCartItemsData: [],
    getCartItemsError: "",
    addCartItemsLoading:false,
    addCartItemsData: {},
    addCartItemsError: "",
    deleteCartItemLoading : false,
    deleteCartItemData : {},
    deleteCartItemError : "",
    updateCartItemQuantityLoading : false,
    updateCartItemQuantityData : [],
    updateCartItemQuantityError : ""
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // get cart items
      .addCase(getCartItems.pending, (state) => {
        state.getCartItemsLoading = true;
        state.getCartItemsError = "";
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.getCartItemsLoading = false;
        state.getCartItemsData = action?.payload?.data;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.getCartItemsLoading = false;
        state.getCartItemsData = action?.payload?.data;
        state.getCartItemsError = action?.error.message;
      })
    // add cart items
    .addCase(addCartItems.pending, (state) => {
        state.addCartItemsLoading = true;
        state.addCartItemsError = "";
      })
      .addCase(addCartItems.fulfilled, (state, action) => {
        state.addCartItemsLoading = false;
        state.addCartItemsData = action?.payload?.data;
        
      })
      .addCase(addCartItems.rejected, (state, action) => {
        state.addCartItemsLoading = false;
        state.addCartItemsData = action?.payload?.data;
        state.addCartItemsError = action?.error.message;
      })
          // delete cart item
    .addCase(deleteCartItem.pending, (state) => {
        state.deleteCartItemLoading = true;
        state.deleteCartItemError = "";
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.deleteCartItemLoading = false;
        state.deleteCartItemData = action?.payload?.data;
        
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.deleteCartItemLoading = false;
        state.deleteCartItemData = action?.payload?.data;
        state.deleteCartItemError = action?.error.message;
      })
        // update cart item
    .addCase(updateCartItemQuantity.pending, (state) => {
        state.updateCartItemQuantityLoading = true;
        state.updateCartItemQuantityError = "";
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.updateCartItemQuantityLoading = false;
        state.updateCartItemQuantityData = action?.payload?.data;
        
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.updateCartItemQuantityLoading = false;
        state.updateCartItemQuantityData = action?.payload?.data;
        state.updateCartItemQuantityError = action?.error.message;
      })
  }
})

const { actions, reducer: cartReducer } = cartSlice;

export default cartReducer;