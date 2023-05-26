import React, { useEffect } from "react"
import useViewModel from "./ViewModel"
import List from "../../../components/List"
import Button from "../../../components/Button"
import TextInput from "../../../components/TextInput"
import { useNavigate } from "react-router-dom";
import { CreateProductUseCase } from '../../../../Domain/UseCase/Product/CreateProduct'
import { ProductRepository } from "../../../../Data/Repository/ProductRepository";
import * as ProductLocalStorageDataSource from "../../../../Data/DataSource/ProductLocalStorageDataSource";

export default function ProductNew() {
    let navigate = useNavigate();
    const { name, price, onChange, saveProduct } = useViewModel({
        CreateProductUseCase: CreateProductUseCase({ ProductRepository: ProductRepository({ ProductDataSource: ProductLocalStorageDataSource }) })
    });


    return (
        <div className="page">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <h2>New Product</h2>
                <Button title={"Save"} onClick={() => {
                    saveProduct()
                    navigate(-1)
                }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", padding: 30 }}>
                <TextInput placeholder="Product Name" autoFocus={true} value={name} onChange={e => onChange(e.target.value, "name")} />
                <TextInput placeholder="Product Price" type="number" value={price} onChange={e => onChange(e.target.value, "price")} />
            </div>
        </div>
    );
}