import { createProduct } from '../../../Data/Repository/ProductRepository'
export async function CreateProductUseCase(productData) {
    return await createProduct(productData)
}
