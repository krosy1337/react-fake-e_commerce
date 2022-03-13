import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {IProduct} from "types/products"

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://fakestoreapi.com/"}),
    endpoints: (build) => ({
        getAllProducts: build.query<IProduct[], string>({
            query: () => ({
                url: "products"
            })
        })
    })
})