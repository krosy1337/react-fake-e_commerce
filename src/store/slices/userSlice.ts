import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {IUser} from "types/user"
import {loginUser, registerUser} from "./actionCreators"

const initialState: IUser = {
    email: '',
    id: '',
    token: '',
    isLoading: false,
    error: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.email = action.payload.email
            state.id = action.payload.id
            state.token = action.payload.token
        },
        removeUser: (state) => {
            state.email = ''
            state.id = ''
            state.token = ''
        }
    },
    extraReducers: {
        [loginUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.email = action.payload.email
            state.id = action.payload.id
            state.token = action.payload.token
            state.isLoading = false
            state.error = ''
        },
        [loginUser.pending.type]: (state) => {
            state.isLoading = true
            state.error = ''
        },
        [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [registerUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.email = action.payload.email
            state.id = action.payload.id
            state.token = action.payload.token
            state.isLoading = false
            state.error = ''
        },
        [registerUser.pending.type]: (state) => {
            state.isLoading = true
            state.error = ''
        },
        [registerUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default  userSlice.reducer