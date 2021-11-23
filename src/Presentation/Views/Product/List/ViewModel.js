import { useState } from "react"
import getProductsUseCase from '../../../../Domain/UseCase/Product/GetProducts'

export default function ProductListViewModel() {

    const [products, setProducts] = useState([]);

    async function getProducts() {
        const { result, error } = await getProductsUseCase.invoke();
        setProducts(result)
    }
    return {
        getProducts,
        products,
    }
}