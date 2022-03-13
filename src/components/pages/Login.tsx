import React from 'react'
import AuthForm from "components/UI/AuthForm"
import {useNavigate} from "react-router-dom"
import {useActions} from "hooks/redux"
import {RouteNames} from "types/routes"

const Login = () => {
    const {loginUser, clearCart} = useActions()

    const navigate = useNavigate()

    const authHandler = async (email: string, password: string) => {
        const response: any = await loginUser({email, password})
        if (!response.error) {
            clearCart()
            navigate('/')
        }
    }

    return (
        <AuthForm title="LOGIN" onClick={authHandler}
                  link={RouteNames.REGISTER} linkText="Create an account" />
    )
}

export default Login