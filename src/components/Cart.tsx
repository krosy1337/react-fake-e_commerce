import React, {FC, useState} from 'react'
import {Alert, Box, Button, Drawer, Snackbar, Typography} from "@mui/material"
import {ICart} from "types/cart"
import CartItem from "./CartItem"
import {getAuth} from "firebase/auth"
import {child, get, push, ref, remove, set} from "firebase/database"
import {database} from "../firebase"
import {useActions} from "hooks/redux"

interface CartProps {
    cart: ICart
    open: boolean
    onClose: () => void
}

const Cart: FC<CartProps> = ({cart, open, onClose}) => {
    const totalPrice = cart.products.reduce(((accumulator: number, currentValue) =>
        accumulator + currentValue.price*currentValue.count), 0).toFixed(2)

    const [isSnackVisible, setSnackVisible] = useState<boolean>(false)

    const {clearCart} = useActions()

    const sendOrder = async () => {
        const {currentUser} = getAuth()
        const dbRef = ref(database)
        const products = await get(child(dbRef, `carts/${currentUser?.uid}`))
        const orderListRef = ref(database, 'orders')
        const newOrderKey = push(orderListRef)
        await set(newOrderKey, {
            userId: currentUser?.uid,
            products: products.val(),
            totalPrice,
        })
        remove(ref(database, `carts/${currentUser?.uid}`))
        clearCart()
        setSnackVisible(true)
    }

    return (
        <Drawer anchor="right" open={open} onClose={onClose} variant="temporary">
            <Box sx={{
                width: 300,
                padding: 1,
            }}>
                <Box>
                    {cart.products.length
                        ?
                        cart.products.map((cartItem) =>
                            <CartItem key={cartItem.id} cartItem={cartItem} />
                        )
                        :
                        <Typography variant="h6" textAlign="center">Cart is empty</Typography>
                    }
                </Box>
            </Box>
            {cart.products.length
                ?
                <Box sx={{
                    marginTop: 'auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <Typography variant="h6" fontWeight={700}>Total: {totalPrice} $</Typography>
                    <Button variant="outlined" onClick={sendOrder}>Order</Button>
                </Box>
                :
                ''
            }
            <Snackbar open={isSnackVisible} onClose={() => setSnackVisible(false)} autoHideDuration={3000} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}>
                <Alert severity="success" onClose={() => setSnackVisible(false)} sx={{width: '100%', alignItems: 'center'}}>
                    <Typography variant="h6">Thank you for order!!!</Typography>
                </Alert>
            </Snackbar>
        </Drawer>
    )
}

export default Cart