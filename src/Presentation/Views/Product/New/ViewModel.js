
import { useState } from "react"


export default function ProductNewViewModel({ CreateProductUseCase }) {
    const [error, setError] = useState("")
    const [values, setValues] = useState({
        name: "",
        price: 0
    })

    function onChange(value, prop) {
        setValues({ ...values, [prop]: value })
    }

    async function saveProduct() {
        const { result, error } = await CreateProductUseCase.execute(values)
        setError(error)
    }

    return {
        ...values,
        error,
        onChange,
        saveProduct
    }
}