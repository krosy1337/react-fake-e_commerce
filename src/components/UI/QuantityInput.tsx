import React, {FC} from 'react'
import {Box, Button, TextField} from "@mui/material"

interface QuantityInputProps {
    quantity: number
    setQuantity: (quantity: number) => void
}

const QuantityInput: FC<QuantityInputProps> = ({quantity, setQuantity}) => {
    const increment = () => {
        setQuantity(quantity+1)
    }
    const decrement = () => {
        if (quantity === 1) {
            return
        }
        setQuantity(quantity-1)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const lowerThenOne = +e.target.value < 1
        const notANumber = e.target.value.match(/[^0-9]/g)
        if (lowerThenOne || notANumber) {
            return
        }
        setQuantity(+e.target.value)
    }
    return (
        <Box>
            <Button variant="outlined" sx={{
                padding: "1px",
                minWidth: 20,
                height: 30,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
            }} onClick={increment}>+</Button>
            <TextField color="primary" sx={{
                height: 30,
                width: 30,
                '& input': {
                    padding: '2px',
                    height: 30,
                    boxSizing: 'border-box',
                },
                '& fieldset': {
                    borderRadius: 0,
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderColor: 'rgba(25, 118, 210, 0.5)',
                },
                '.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(25, 118, 210, 0.5)',
                },
                '.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(25, 118, 210, 0.5)',
                    borderWidth: 1,
                }
            }} value={quantity} onChange={onChange}/>
            <Button variant="outlined" sx={{
                padding: "1px",
                minWidth: 20,
                height: 30,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
            }} onClick={decrement}>-</Button>
        </Box>
    )
}

export default QuantityInput