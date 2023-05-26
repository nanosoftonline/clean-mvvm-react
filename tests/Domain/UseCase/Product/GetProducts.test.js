import 'regenerator-runtime/runtime'
import { GetProductsUseCase } from '../../../../src/Domain/UseCase/Product/GetProducts';

const mockProductRepository = {
    getProducts: jest.fn(),
};


describe('UpdateProductUseCase', () => {
    let getProductsUseCase;

    beforeEach(() => {
        getProductsUseCase = GetProductsUseCase({ ProductRepository: mockProductRepository });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return expected result', async () => {
        // Arrange


        // Mock 
        mockProductRepository.getProducts.mockResolvedValue({ result: [{ id: "123", price: 10, name: "test" }], error: null });

        // Act
        const { result, error } = await getProductsUseCase.execute()

        // Assert
        expect(mockProductRepository.getProducts).toHaveBeenCalled();
        expect(result).toEqual([{ id: "123", price: 10, name: "test" }]);
    });
});
