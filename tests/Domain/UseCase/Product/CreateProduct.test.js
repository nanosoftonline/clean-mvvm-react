import 'regenerator-runtime/runtime'
import { CreateProductUseCase } from '../../../../src/Domain/UseCase/Product/CreateProduct';

const mockProductRepository = {
    createProduct: jest.fn(),
};


describe('CreateProductUseCase', () => {
    let createProductUseCase;

    beforeEach(() => {
        createProductUseCase = CreateProductUseCase({ ProductRepository: mockProductRepository });
    });

    afterEach(() => {
        // Reset the mock after each test
        jest.clearAllMocks();
    });

    it('should result in true on created product', async () => {
        // Arrange
        const productData = {
            name: 'Test Product',
            price: 10.99,
        };

        const createdProduct = {
            id: 'abc123',
            ...productData,
        };

        // Mock
        mockProductRepository.createProduct.mockResolvedValue({ result: true, error: null });

        // Act
        const { result, error } = await createProductUseCase.execute(productData);

        // Assert
        expect(result).toEqual(true);
    });
});
