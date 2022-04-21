import { deleteProduct } from '../../../Data/Repository/ProductRepository'
export async function DeleteProductUseCase(id) {
    return await deleteProduct(id)
}