import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from 'store/store'
import {bindActionCreators} from "@reduxjs/toolkit"
import {cartSlice} from "store/slices/cartSlice"
import {userSlice} from "store/slices/userSlice"
import {loginUser, registerUser} from "store/slices/actionCreators"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const actionCreators = {
    ...cartSlice.actions,
    ...userSlice.actions,
    loginUser,
    registerUser
}

export const useActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(actionCreators, dispatch)
}