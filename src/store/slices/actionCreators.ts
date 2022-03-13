import {createAsyncThunk} from "@reduxjs/toolkit"
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth"

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({email, password}: { email: string, password: string }, thunkApi) => {
        try {
            const auth = getAuth()
            const {user} = await signInWithEmailAndPassword(auth, email, password)
            const accessToken = await user.getIdToken()

            return {
                email: user.email,
                token: accessToken,
                id: user.uid
            }
        } catch (e: any) {
            return thunkApi.rejectWithValue(e.code)
        }
    }
)

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async ({email, password}: { email: string, password: string }, thunkApi) => {
        try {
            const auth = await getAuth()
            const {user} = await createUserWithEmailAndPassword(auth, email, password)
            const accessToken = await user.getIdToken()

            return {
                email: user.email,
                token: accessToken,
                id: user.uid
            }
        } catch (e: any) {
            return thunkApi.rejectWithValue(e.code)
        }
    }
)