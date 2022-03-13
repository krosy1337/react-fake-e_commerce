import React, {Dispatch, FC, SetStateAction, useMemo, useState} from 'react'
import Cart from "../Cart"
import {CircularProgress, Container} from "@mui/material"
import ProductList from "../ProductList"
import {useAppSelector} from "../../hooks/redux"
import {productsApi} from "../../services/productsService"
import SortProducts from "../SortProducts"

export interface ISortItem {
    value: string
    text: string
    factor?: number
}

interface ProductsProps {
    isCartOpened: boolean
    setCartOpened: Dispatch<SetStateAction<boolean>>
}

const Products: FC<ProductsProps> = ({isCartOpened, setCartOpened}) => {
    const cart = useAppSelector(state => state.cart)
    const [sort, setSort] = useState<string>('')

    const sortItems: ISortItem[] = [
        {
            value: 'title',
            text: 'Title',
        },
        {
            value: 'priceLowToHigh',
            text: 'Price: Low to High'
        },
        {
            value: 'priceHighToLow',
            text: 'Price: High to Low'
        },
    ]

    const {data, isLoading, error} = productsApi.useGetAllProductsQuery('')

    const sortedProducts = useMemo(() => {
        if (sort && data) {
            if (['title'].includes(sort)) {
                return [...data].sort((a: any, b: any) => a[sort].localeCompare(b[sort]))
            }
            if (['priceLowToHigh', 'priceHighToLow'].includes(sort)) {
                let factor = 1
                if (sort === 'priceLowToHigh') {
                    factor = -1
                }
                return [...data].sort((a: any, b: any) => (b['price'] - a['price'])*factor)
            }
            return [...data].sort((a: any, b: any) => b[sort] - a[sort])
        }
        return data
    }, [sort, data])

    return (
        <>
            <Cart cart={cart} open={isCartOpened} onClose={() => setCartOpened(false)}/>
            <Container sx={{
                paddingY: "80px",
            }}>
                {isLoading && <CircularProgress sx={{margin: 'auto', display: 'block'}}/>}
                {error && <h1>Произошла ошибка</h1>}
                {sortedProducts &&
                    <>
                        <SortProducts sortType={sort} setSortType={setSort} sortItems={sortItems} />
                        <ProductList products={sortedProducts}/>
                    </>
                }
            </Container>
        </>
    )
}

export default Products