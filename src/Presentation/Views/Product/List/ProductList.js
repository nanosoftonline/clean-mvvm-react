import React, { useEffect } from "react"
import useViewModel from "./ViewModel"
import List from "../../../components/List"
import Button from "../../../components/Button"
import { useNavigate } from "react-router-dom";
import DI from '../../../../DI/ioc'

export default function ProductList() {
    let navigate = useNavigate();
    const { products, getProducts } = useViewModel({
        GetProductsUseCase: DI.resolve("GetProductsUseCase")
    });

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="page">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <h2>Product List</h2>
                <Button title={"New"} onClick={() => navigate(`/product/new`)} />
            </div>
            <List data={products} onRowClick={(id) => navigate(`/product/detail/${id}`)} />
        </div>
    );
}