import 'regenerator-runtime/runtime'
import { UpdateProductUseCase } from '../../../../src/Domain/UseCase/Product/UpdateProduct';

const mockProductRepository = {
    updateProduct: jest.fn(),
};


describe('UpdateProductUseCase', () => {
    let updateProductUseCase;

    beforeEach(() => {
        updateProductUseCase = UpdateProductUseCase({ ProductRepository: mockProductRepository });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should result in true on update', async () => {
        // Arrange
        const productId = 'abc123';

        // Mock 
        mockProductRepository.updateProduct.mockResolvedValue({ result: true, error: null });

        // Act
        const { result, error } = await updateProductUseCase.execute(productId, { name: "test", price: 100 })

        // Assert
        expect(result).toEqual(true);
    });
});
