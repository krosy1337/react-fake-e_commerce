import React, {FC} from 'react'
import {IProduct} from "../types/products"
import {Grid} from "@mui/material"
import ProductItem from "./ProductItem"

interface ProductListProps {
    products: IProduct[]
}

const ProductList: FC<ProductListProps> = ({products}) => {
    return (
        <Grid container spacing={2}>
            {products.map((product) =>
                <Grid item md={4} xs={12} key={product.id}>
                    <ProductItem product={product} />
                </Grid>
            )}
        </Grid>
    )
}

export default ProductList