import React, {FC} from 'react'
import {ICartItem} from "types/cart"
import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import QuantityInput from "./UI/QuantityInput"
import {useActions} from "../hooks/redux"
import {getAuth} from "firebase/auth"
import {ref, set, remove} from "firebase/database"
import {database} from "../firebase"

interface CartItemProps {
    cartItem: ICartItem
}

const CartItem: FC<CartItemProps> = ({cartItem}) => {
    const {setProductQuantity, removeProduct, clearCart} = useActions()

    const quantity = cartItem.count

    const setQuantity = (newQuantity: number) => {
        setProductQuantity({productId: cartItem.id, count: newQuantity})
        const auth = getAuth()
        const currentUser = auth.currentUser
        set(ref(database, `carts/${currentUser?.uid}/${cartItem.id}`),{
            title: cartItem.title,
            count: newQuantity,
            price: cartItem.price,
            id: cartItem.id,
            image: cartItem.image,
            description: cartItem.description,
            category: cartItem.category,
        })
    }

    const removeHandler = () => {
        removeProduct(cartItem.id)
        const auth = getAuth()
        remove(ref(database, `carts/${auth.currentUser?.uid}/${cartItem.id}`))
        clearCart()
    }
    return (
        <Card sx={{
            display: 'flex',
            marginY: 2,
            padding: 1,
            columnGap: 1,
            backgroundColor: '#fff',
        }}>
            <CardMedia component="img"
                       width="100"
                       image={cartItem.image}
                       alt={cartItem.title}
                       sx={{
                           objectFit: 'contain',
                           width: 100,
                       }}
            />
            <CardContent sx={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                '&:last-child': {
                    paddingBottom: 0,
                }
            }}>
                <Typography variant="body1" overflow="hidden" whiteSpace="nowrap"
                            textOverflow="ellipsis" fontWeight={700}
                >{cartItem.title}</Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 1,
                }}>
                    <Typography variant="body1" fontWeight={700}>{cartItem.price} $</Typography>
                    <QuantityInput quantity={quantity} setQuantity={setQuantity} />
                </Box>
                <Button variant="outlined" sx={{marginTop: 'auto', alignSelf: 'start'}} color="error"
                        onClick={removeHandler}>
                    <DeleteIcon/>
                    <Typography variant="body2">Delete</Typography>
                </Button>
            </CardContent>
        </Card>
    )
}

export default CartItem