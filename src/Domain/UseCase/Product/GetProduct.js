/**
 * 
 * @param {{ProductRepository: {getProduct: (id: string) => {result:any, error: Error?}}}} param 
 * @returns {{execute: (id: string) => Promise<{result: any, error: Error?}>}}
 */
export function GetProductUseCase({ ProductRepository }) {
    return {
        async execute(id) {
            const { result, error } = await ProductRepository.getProduct(id)
            return { result, error }
        }
    }
}