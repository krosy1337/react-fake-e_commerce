import React, {FC, useEffect, useState} from 'react'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material"
import Header from "./components/Layout/Header"
import {useActions, useAppSelector} from "./hooks/redux"
import Products from "./components/pages/Products"
import Login from "./components/pages/Login"
import Register from 'components/pages/Register'
import {useRoutes} from 'react-router-dom'
import {RouteNames} from "./types/routes"
import {getAuth} from "firebase/auth"
import {ref, get, child} from "firebase/database"
import {database} from "./firebase"
import {ICartItem} from "./types/cart"

const theme = createTheme({
    palette: {
        background: {
            default: '#e4e4e4',
            paper: '#e4e4e4',
        }
    }
})

const App: FC = () => {
    const [isCartOpened, setCartOpened] = useState<boolean>(false)

    const {setUser, addProduct} = useActions()

    const cart = useAppSelector(state => state.cart)

    const routes = useRoutes([
        {
            path: RouteNames.ROOT,
            element: <Products isCartOpened={isCartOpened} setCartOpened={setCartOpened}/>,
        },
        {path: RouteNames.LOGIN, element: <Login/>,},
        {path: RouteNames.REGISTER, element: <Register/>,},
    ])

    const init = async () => {
        const auth = getAuth()
        auth.onAuthStateChanged(async () => {
            const currentUser: any = auth.currentUser
            if (currentUser) {
                setUser({
                    email: currentUser.email,
                    isLoading: false,
                    error: '',
                    id: currentUser.uid,
                    token: currentUser.accessToken
                })
                const dbRef = ref(database)
                const products = await get(child(dbRef, `carts/${currentUser.uid}`))
                if (products.exists()) {
                    Object.keys(products.val()).forEach((key) => {
                        const product: ICartItem = products.val()[key]
                        addProduct({
                            id: product.id,
                            count: product.count,
                            category: product.category,
                            description: product.description,
                            image: product.image,
                            price: product.price,
                            title: product.title,
                        })
                    })
                }
            }
        })
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header cartQuantity={cart.products.length} openCart={() => setCartOpened(true)}/>
            {routes}
        </ThemeProvider>
    )
}

export default App
