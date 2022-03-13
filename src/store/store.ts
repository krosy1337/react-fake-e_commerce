import {configureStore} from "@reduxjs/toolkit"
import {productsApi} from "services/productsService"
import cartReducer from 'store/slices/cartSlice'
import userReducer from 'store/slices/userSlice'

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        cart: cartReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch