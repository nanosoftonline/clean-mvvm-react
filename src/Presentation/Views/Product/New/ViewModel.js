
import { useState } from "react"
import { CreateProductUseCase } from '../../../../Domain/UseCase/Product/CreateProduct'

export default function ProductNewViewModel() {
    const [error, setError] = useState("")
    const [values, setValues] = useState({
        name: "",
        price: 0
    })

    function onChange(value, prop) {
        setValues({ ...values, [prop]: value })
    }

    async function saveProduct() {
        const { result, error } = await CreateProductUseCase(values)
        setError(error)
    }

    return {
        ...values,
        error,
        onChange,
        saveProduct
    }
}