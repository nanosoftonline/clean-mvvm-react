/**
 * 
 * @param {{ProductRepository: {deleteProduct: (id: string) => {result:boolean, error: Error?}}}} param 
 * @returns {{execute: (id: string) => Promise<{result: boolean, error: Error?}>}}
 */
export function DeleteProductUseCase({ ProductRepository }) {
    return {
        async execute(id) {
            const { result, error } = await ProductRepository.deleteProduct(id)
            return { result, error }
        }
    }
}



