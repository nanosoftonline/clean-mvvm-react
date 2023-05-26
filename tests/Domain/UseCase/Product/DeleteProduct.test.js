import 'regenerator-runtime/runtime'
import { DeleteProductUseCase } from '../../../../src/Domain/UseCase/Product/DeleteProduct';

const mockProductRepository = {
    deleteProduct: jest.fn(),
};


describe('DeleteProductUseCase', () => {
    let deleteProductUseCase;

    beforeEach(() => {
        deleteProductUseCase = DeleteProductUseCase({ ProductRepository: mockProductRepository });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should result in true on delete', async () => {
        // Arrange
        const productId = 'abc123';

        // Mock 
        mockProductRepository.deleteProduct.mockResolvedValue({ result: true, error: null });

        // Act
        const { result, error } = await deleteProductUseCase.execute(productId);

        // Assert
        expect(result).toEqual(true);
    });
});
