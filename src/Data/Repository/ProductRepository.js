export function ProductRepository({ ProductDataSource }) {
    return {

        async createProduct(data) {
            const { result, error } = await ProductDataSource.create(data);
            return { result, error }
        },

        async deleteProduct(id) {
            const { result, error } = await ProductDataSource.deleteOne(id)
            return { result, error }
        },

        async updateProduct(id, data) {
            const { result, error } = await ProductDataSource.update(id, data)
            return { result, error }
        },

        async getProducts() {
            const { result, error } = await ProductDataSource.getAll()
            return { result, error }
        },

        async getProduct(id) {
            const { result, error } = await ProductDataSource.getOne(id)
            return { result, error }
        }
    }
}
