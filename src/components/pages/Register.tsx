import React from 'react'
import AuthForm from "components/UI/AuthForm"
import {useActions} from "hooks/redux"
import {useNavigate} from "react-router-dom"
import {RouteNames} from "types/routes"

const Register = () => {
    const {registerUser, clearCart} = useActions()

    const navigate = useNavigate()

    const authHandler = async (email: string, password: string) => {
        const response: any = await registerUser({email, password})
        if (!response.error) {
            clearCart()
            navigate('/')
        }
    }
    return (
        <AuthForm title="REGISTER" onClick={authHandler}
                  link={RouteNames.LOGIN} bottomText='Already have an account?' linkText="Sign in"/>
    )
}

export default Register