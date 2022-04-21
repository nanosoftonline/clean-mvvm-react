import React, { useEffect } from "react"
import useViewModel from "./ViewModel"
import Button from "../../../components/Button"
import TextInput from "../../../components/TextInput"
import { useNavigate, useParams } from "react-router-dom";


export default function ProductDetail() {
    let navigate = useNavigate();
    let { id } = useParams();
    const { name, price, getProduct, onChange, updateProduct, deleteProduct } = useViewModel();

    useEffect(() => {
        getProduct(id)
    }, [])

    return (
        <div className="page">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <h2>Edit Product</h2>
                <div style={{ display: "flex" }}>
                    <Button
                        title="Delete"
                        onClick={() => {
                            deleteProduct(id)
                            navigate(-1)
                        }} />

                    <Button title="Update" onClick={() => {
                        updateProduct(id)
                        navigate(-1)
                    }} />
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", padding: 30 }}>
                <TextInput placeholder="Product Name" autoFocus={true} value={name} onChange={e => onChange(e.target.value, "name")} />
                <TextInput placeholder="Product Price" type="number" value={price} onChange={e => onChange(e.target.value, "price")} />
            </div>
        </div>
    );
}