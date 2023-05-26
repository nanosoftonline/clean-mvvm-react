/**
 * 
 * @param {{ProductRepository: {createProduct: (productData: any) => {result:boolean, error: Error?}}}} params
 * @returns {{execute: (productData: any) => Promise<{result: boolean, error: Error?}>}}
 */
export function CreateProductUseCase({ ProductRepository }) {
    return {
        async execute(productData) {
            const { error, result } = await ProductRepository.createProduct(productData)
            return { error, result }
        }
    }
}
