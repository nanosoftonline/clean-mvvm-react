import { updateProduct } from '../../../Data/Repository/ProductRepository'
export async function UpdateProductUseCase(id, productData) {
    return await updateProduct(id, productData)
}