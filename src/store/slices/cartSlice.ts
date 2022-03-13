import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ICart, ICartItem} from "../../types/cart"

const initialState = {
    products: []
} as ICart

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ICartItem>) => {
            state.products.push(action.payload)
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter((product: ICartItem) => product.id !== action.payload)
        },
        clearCart: (state) => {
            state.products = []
        },
        setProductQuantity: (state, action: PayloadAction<{productId: number, count: number}>) => {
            state.products = state.products.map((product: ICartItem) => {
                if (product.id === action.payload.productId) {
                    product.count = action.payload.count
                }
                return product
            })
        }
    },
})

export default cartSlice.reducer