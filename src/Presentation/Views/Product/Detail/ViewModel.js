import { useState } from "react"


export default function ProductDetailViewModel({ GetProductUseCase, UpdateProductUseCase, DeleteProductUseCase }) {


    const [error, setError] = useState("")
    const [values, setValues] = useState({
        id: null,
        name: "",
        price: 0
    })

    async function getProduct(id) {
        const { result, error } = await GetProductUseCase.execute(id);
        setError((error && error.message) || "")
        setValues({ ...result })
    }

    function onChange(value, prop) {
        setValues({ ...values, [prop]: value })
    }

    async function updateProduct(id) {
        const { result, error } = await UpdateProductUseCase.execute(id, values)
        setError((error && error.message) || "")
    }

    async function deleteProduct(id) {
        const { result, error } = await DeleteProductUseCase.execute(id)
        setError((error && error.message) || "")

    }


    return {
        error,
        deleteProduct,
        updateProduct,
        getProduct,
        onChange,
        ...values,
    }
}