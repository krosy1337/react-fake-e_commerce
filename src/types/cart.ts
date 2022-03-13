import {IProduct} from "./products"

export interface ICartItem extends IProduct{
    count: number
}

export interface ICart {
    products: ICartItem[]
}