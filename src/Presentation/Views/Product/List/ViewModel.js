import { useState } from "react"
import { GetProductsUseCase } from '../../../../Domain/UseCase/Product/GetProducts'

export default function ProductListViewModel() {

    const [error, setError] = useState("");
    const [products, setProducts] = useState([]);

    async function getProducts() {
        const { result, error } = await GetProductsUseCase();
        setError(error)
        setProducts(result)
    }
    return {
        error,
        getProducts,
        products,
    }
}