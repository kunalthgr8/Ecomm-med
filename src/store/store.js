import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import cartSlice from './cart/cartSlice';
import offerSlice from './offer/offerSlice';

const store = configureStore({
    reducer:{
        auth : authSlice,
        cart : cartSlice,
        offer : offerSlice
    }
})

export default store;