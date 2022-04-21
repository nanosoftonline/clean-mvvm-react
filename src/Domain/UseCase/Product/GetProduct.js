import { getProduct } from '../../../Data/Repository/ProductRepository'
export async function GetProductUseCase(id) {
    return await getProduct(id)
}