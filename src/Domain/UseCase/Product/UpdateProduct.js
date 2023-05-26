/**
 * 
 * @param {{ProductRepository: {updateProduct: (id: string, productData: any) => {result:boolean, error: Error?}}}} param 
 * @returns {{execute: (id: string, productData: any) => Promise<{result: boolean, error: Error?}>}}
 */
export function UpdateProductUseCase({ ProductRepository }) {
    return {
        async execute(id, productData) {
            const { error, result } = await ProductRepository.updateProduct(id, productData)
            return { error, result }
        }
    }
}