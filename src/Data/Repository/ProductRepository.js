import { create, update, getAll, getOne, deleteOne } from '../DataSource/ProductLocalStorageDataSource'

export async function createProduct(data) {
    const { result, error } = await create(data);
    return { result, error }
}

export async function deleteProduct(id) {
    const { result, error } = await deleteOne(id)
    return { result, error }
}

export async function updateProduct(id, data) {
    const { result, error } = await update(id, data)
    return { result, error }
}

export async function getProducts() {
    const { result, error } = await getAll()
    return { result, error }
}

export async function getProduct(id) {
    const { result, error } = await getOne(id)
    return { result, error }
}