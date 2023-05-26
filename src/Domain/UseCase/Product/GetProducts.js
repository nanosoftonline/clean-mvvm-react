/**
 * 
 * @param {{ProductRepository: {getProducts: () => {result:any, error: Error?}}}} param 
 * @returns {{execute: () => Promise<{result: any, error: Error?}>}}
 */
export function GetProductsUseCase({ ProductRepository }) {
    return {
        async execute() {
            const { result, error } = await ProductRepository.getProducts()
            return { result, error }
        }
    }
}