import React, {FC} from 'react'
import {IProduct} from "types/products"
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material"
import {useActions, useAppSelector} from "hooks/redux"
import {ICartItem} from "types/cart"
import {useAuth} from "hooks/useAuth"
import {useNavigate} from "react-router-dom"
import {RouteNames} from "types/routes"
import {getAuth} from "firebase/auth"
import {ref, set} from "firebase/database"
import {database} from "../firebase"

interface ProductItemProps {
    product: IProduct
}

const ProductItem: FC<ProductItemProps> = ({product}) => {
    const cart = useAppSelector(state => state.cart)
    const {isAuth} = useAuth()
    const {addProduct} = useActions()
    const navigate = useNavigate()

    const addProductToCart = () => {
        if (isAuth) {
            const newCartItem: ICartItem = {...product, count: 1}
            addProduct(newCartItem)
            const auth = getAuth()
            const currentUser = auth.currentUser
            set(ref(database, `carts/${currentUser?.uid}/${product.id}`),{
                title: product.title,
                count: 1,
                price: product.price,
                id: product.id,
                image: product.image,
                description: product.description,
                category: product.category,
            })
            return
        }
        navigate(RouteNames.LOGIN)
    }

    const isInCart = !!cart.products.find((cartItem: ICartItem) => cartItem.id === product.id)

    return (
        <Card variant="outlined" sx={{
            height: '100%',
            padding: 2,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
        }}>
            <CardMedia component="img" height="200" image={product.image} alt={product.title}
                       sx={{
                           objectFit: 'contain',
                       }}/>
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
            }}>
                <Typography variant="h6" component="h6" mb={2}>{product.title}</Typography>
                <Typography variant="subtitle1" component="p" textAlign="left" overflow="hidden"
                            textOverflow="ellipsis"
                            maxHeight="200px">{product.description}
                </Typography>
                <Typography variant="h6" component="p" textAlign="left" fontWeight="700" mt="auto">{product.price} $</Typography>
            </CardContent>
            <CardActions sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 0,
            }}>
                <Button disabled={isInCart} variant="outlined" color="primary" onClick={addProductToCart}>
                    {
                        isInCart
                        ? 'Already in the cart'
                        : 'Add to cart'
                    }

                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductItem