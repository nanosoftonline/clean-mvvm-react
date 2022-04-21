import { useState } from "react"
import { GetProductUseCase } from '../../../../Domain/UseCase/Product/GetProduct'
import { UpdateProductUseCase } from "../../../../Domain/UseCase/Product/UpdateProduct";
import { DeleteProductUseCase } from "../../../../Domain/UseCase/Product/DeleteProduct";

export default function ProducDetailViewModel() {


    const [error, setError] = useState("")
    const [values, setValues] = useState({
        id: null,
        name: "",
        price: 0
    })

    async function getProduct(id) {
        const { result, error } = await GetProductUseCase(id);
        setError(error)
        setValues({ ...result })
    }

    function onChange(value, prop) {
        setValues({ ...values, [prop]: value })
    }

    async function updateProduct(id) {
        const { result, error } = await UpdateProductUseCase(id, values)
        setError(error)
    }

    async function deleteProduct(id) {
        const { result, error } = await DeleteProductUseCase(id)
        setError(error)

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