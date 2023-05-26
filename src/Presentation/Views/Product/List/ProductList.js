import React, { useEffect } from "react"
import useViewModel from "./ViewModel"
import List from "../../../components/List"
import Button from "../../../components/Button"
import { useNavigate } from "react-router-dom";
import { GetProductsUseCase } from '../../../../Domain/UseCase/Product/GetProducts'
import { ProductRepository } from "../../../../Data/Repository/ProductRepository";
import * as ProductLocalStorageDataSource from "../../../../Data/DataSource/ProductLocalStorageDataSource";

export default function ProductList() {
    let navigate = useNavigate();
    // const getProductUseCase = GetProductsUseCase({ ProductRepository: ProductRepository({ ProductDataSource: ProductLocalStorageDataSource }) })
    //  getProductUseCase.execute()
    const { products, getProducts } = useViewModel({
        GetProductsUseCase: GetProductsUseCase({ ProductRepository: ProductRepository({ ProductDataSource: ProductLocalStorageDataSource }) })
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