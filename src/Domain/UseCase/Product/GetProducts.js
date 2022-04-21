import { getProducts } from '../../../Data/Repository/ProductRepository'
export async function GetProductsUseCase() {
    return await getProducts()
}