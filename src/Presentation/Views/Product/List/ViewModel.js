import { useState } from "react"

export default function ProductListViewModel({ GetProductsUseCase }) {

    const [error, setError] = useState("");
    const [products, setProducts] = useState([]);

    async function getProducts() {
        const { result, error } = await GetProductsUseCase.execute();
        setError(error)
        setProducts(result)
    }
    return {
        error,
        getProducts,
        products,
    }
}