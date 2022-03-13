import {useAppSelector} from "./redux"

export const useAuth = () => {
    const {email, token, id, isLoading, error} = useAppSelector(state => state.user)

    return {
        isAuth: !!id,
        email,
        token,
        id,
        isLoading,
        error,
    }
}