import 'regenerator-runtime/runtime'
import { GetProductUseCase } from '../../../../src/Domain/UseCase/Product/GetProduct';

const mockProductRepository = {
    getProduct: jest.fn(),
};


describe('UpdateProductUseCase', () => {
    let getProductUseCase;

    beforeEach(() => {
        getProductUseCase = GetProductUseCase({ ProductRepository: mockProductRepository });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return expected result', async () => {
        // Arrange
        const productId = 'abc123';

        // Mock 
        mockProductRepository.getProduct.mockResolvedValue({ result: { id: "123", price: 10, name: "test" }, error: null });

        // Act
        const { result, error } = await getProductUseCase.execute(productId)

        // Assert
        expect(mockProductRepository.getProduct).toHaveBeenCalledWith(productId);
        expect(result).toEqual({ id: "123", price: 10, name: "test" });
    });
});
