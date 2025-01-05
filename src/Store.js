import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Components/Header/Users/userSlice'
import productReducer from './Components/Product/productSlice'
import cartReducer from './Components/Cart/cartSlice'
import searchReducer from './Components/Header/SearchSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    product:productReducer,
    cart: cartReducer,
    search:searchReducer
  },
})