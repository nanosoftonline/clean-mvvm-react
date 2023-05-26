### Clean-MVVM-React-hooks

To cleanly develop and test our application, we would like to test all logic including that in the graphical user interface. To do this, we have to extract all GUI logic from the view layer. This logic will preferably need to be refactored to a view model which can be tested and developed in isolation

I will illustrate a Clean architecture-inspired approach to doing this.

Let’s create a simple application of which one of its features is to manage a list of Products

1. List products
1. Create a product
1. Delete an existing product
1. Update an existing product


A good starting point for this React application is to create the groupings (folders) and containers (files) of code:
```
├─ Data
│   ├─ DataSource
│   │   └─ ProductDataSource.js
│   └─ Repository
│       └─ ProductRepository.js
├─ Domain
│   └─ UseCase
│       └─ Product
│           ├─ GetProducts.js
│           ├─ GetProduct.js
│           ├─ CreateProduct.js
│           ├─ UpdateProduct.js
│           └─ DeleteProduct.js
└─ Presentation
    └─ View
        └─ Product
            ├─ List
            │   ├─ Components
            │   │   ├─ ProductList.js
            │   │   └─ AddButton.js
            │   ├─ View.js
            │   └─ ViewModel.js
            ├─ New
            │   ├─ Components
            │   │   ├─ NameTextField.js
            │   │   ├─ PriceTextField.js
            │   │   └─ SaveButton.js
            │   ├─ View.js
            │   └─ ViewModel.js
            ├─ Detail
            │   ├─ Components
            │   │   ├─ NameTextField.js
            │   │   ├─ PriceTextField.js
            │   │   ├─ UpdateButton.js
            │   │   └─ DeleteButton.js
            │   ├─ View.js
            │   └─ ViewModel.js
            └─ index.js

```
### Product List View
```js
import React, { useEffect } from "react"
import List from "../../../components/List"
import Button from "../../../components/Button"
import { useNavigate } from "react-router-dom";
import DI from '../../../../DI/ioc'

export default function ProductList() {
    let navigate = useNavigate();
    const { products, getProducts } = DI.resolve("ProductListViewModel")

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
```
Using react hooks and useEffect, we show how we’ll load the products into the ProductTable on view load.

By simply refactoring the view components into separate files, we can keep the view easy to read and void of implementations.

These components can be developed in isolation and only need to adhere to the interface or touch-points specified in the view (e.g. onClick, onRowClick, data)

### Product List view model
```js
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
```
### New Product View and View Model

```js
import React from "react"
import Button from "../../../components/Button"
import TextInput from "../../../components/TextInput"
import { useNavigate } from "react-router-dom";
import DI from '../../../../DI/ioc'

export default function ProductNew() {
    let navigate = useNavigate();
    const { name, price, onChange, saveProduct } = DI.resolve("ProductNewViewModel")


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
```
```js
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
```


### Product Detail View and View Model
```js
import React, { useEffect } from "react"
import Button from "../../../components/Button"
import TextInput from "../../../components/TextInput"
import { useNavigate, useParams } from "react-router-dom";
import DI from '../../../../DI/ioc'


export default function ProductDetail() {
    let navigate = useNavigate();
    let { id } = useParams();
    const { name, price, getProduct, onChange, updateProduct, deleteProduct } = DI.resolve("ProductDetailViewModel")

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
```

```js
import { useState } from "react"

export default function ProducDetailViewModel({ GetProductUseCase, UpdateProductUseCase, DeleteProductUseCase }) {


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
```

### Conclusion:
We decouple logic from the view into isolated view models and refactor our UI components of the view into a collection of view components we can develop in isolation. This allows all logic to be testable, including view logic.