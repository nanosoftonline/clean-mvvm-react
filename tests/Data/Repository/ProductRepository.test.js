import { ProductRepository } from '../../../src/Data/Repository/ProductRepository';
import 'regenerator-runtime/runtime'

// Mock ProductDataSource
const mockProductDataSource = {
    create: jest.fn(),
    deleteOne: jest.fn(),
    update: jest.fn(),
    getAll: jest.fn(),
    getOne: jest.fn()

};

describe('ProductRepository', () => {
    let productRepository;

    beforeEach(() => {
        // Create a new instance of ProductRepository with the mock ProductDataSource
        productRepository = ProductRepository({ ProductDataSource: mockProductDataSource });
    });

    afterEach(() => {
        // Reset mock after each test
        jest.clearAllMocks();
    });

    describe('createProduct', () => {

        it('should create a product', async () => {
            //Arrange
            const inputData = { name: 'Example Product', price: 9.99 };

            //Mock
            const mockResult = { result: 'success', error: null };
            mockProductDataSource.create.mockResolvedValue(mockResult);

            //Act
            const { result, error } = await productRepository.createProduct(inputData);

            //Assert
            expect(mockProductDataSource.create).toHaveBeenCalledWith(inputData);

            expect(result).toEqual("success");
            expect(error).toBeNull();
        });

        it('should handle an error during product creation', async () => {
            // Arrange
            const inputData = { name: 'Example Product', price: 9.99 };

            // Mock
            const mockError = new Error('Failed to create product');
            const mockResult = { error: mockError, result: null };
            mockProductDataSource.create.mockResolvedValue(mockResult);

            //Act
            const { result, error } = await productRepository.createProduct(inputData);

            // Assert
            expect(mockProductDataSource.create).toHaveBeenCalledWith(inputData);
            expect(result).toBeNull();
            expect(error).toEqual(mockError);
        });

    });

    describe('deleteProduct', () => {
        it('should delete a product by ID and return the result', async () => {
            // Arrange
            const id = '123';

            // Mock the deleteOne method to return a result
            const expectedResult = { result: 'success', error: null };
            mockProductDataSource.deleteOne.mockResolvedValue(expectedResult);

            // Act
            const result = await productRepository.deleteProduct(id);

            // Assert
            expect(mockProductDataSource.deleteOne).toHaveBeenCalledWith(id);
            expect(result).toEqual(expectedResult);
        });

        it('should handle errors during deletion and return the error', async () => {
            // Arrange
            const id = '123';

            // Mock the deleteOne method to throw an error
            const expectedError = new Error('Failed to delete product');
            const expectedResult = { result: null, error: expectedError };
            mockProductDataSource.deleteOne.mockResolvedValue(expectedResult);

            // Act
            const result = await productRepository.deleteProduct(id);

            // Assert
            expect(mockProductDataSource.deleteOne).toHaveBeenCalledWith(id);
            expect(result).toEqual({ result: null, error: expectedError });
        });
    });

    describe('updateProduct', () => {
        it('should update a product by ID and return the result', async () => {
            // Arrange
            const id = '123';
            const inputData = { name: 'Example Product', price: 9.99 };

            // Mock
            const expectedResult = { result: 'success', error: null };
            mockProductDataSource.update.mockResolvedValue(expectedResult);

            // Act
            const result = await productRepository.updateProduct(id, inputData);

            // Assert
            expect(mockProductDataSource.update).toHaveBeenCalledWith(id, inputData);
            expect(result).toEqual(expectedResult);
        })

        it('should handle errors during update and return the error', async () => {
            // Arrange
            const id = '123';
            const inputData = { name: 'Example Product', price: 9.99 };

            // Mock 
            const expectedError = new Error('Failed to update product');
            const expectedResult = { result: null, error: expectedError };
            mockProductDataSource.update.mockResolvedValue(expectedResult);

            // Act
            const result = await productRepository.updateProduct(id, inputData);

            // Assert
            expect(mockProductDataSource.update).toHaveBeenCalledWith(id, inputData);
            expect(result).toEqual({ result: null, error: expectedError });
        })
    });

    describe('getProducts', () => {
        it('should get all products and return the result', async () => {
            // Arrange

            // Mock
            const expectedResult = { result: 'success', error: null };
            mockProductDataSource.getAll.mockResolvedValue(expectedResult);

            // Act
            const result = await productRepository.getProducts();

            // Assert
            expect(mockProductDataSource.getAll).toHaveBeenCalled();
            expect(result).toEqual(expectedResult);
        })

        it('should handle errors during get all and return the error', async () => {
            // Arrange

            // Mock
            const expectedError = new Error('Failed to get all products');
            const expectedResult = { result: null, error: expectedError };
            mockProductDataSource.getAll.mockResolvedValue(expectedResult);

            // Act
            const result = await productRepository.getProducts();

            // Assert
            expect(mockProductDataSource.getAll).toHaveBeenCalled();
            expect(result).toEqual({ result: null, error: expectedError });
        })
    });

    describe('getProduct', () => {
        it('should get a product by ID and return the result', async () => {
            // Arrange
            const id = '123';

            // Mock
            const expectedResult = { result: 'success', error: null };
            mockProductDataSource.getOne.mockResolvedValue(expectedResult);

            // Act
            const result = await productRepository.getProduct(id);

            // Assert
            expect(mockProductDataSource.getOne).toHaveBeenCalledWith(id);
            expect(result).toEqual(expectedResult);
        })

        it('should handle errors during get one and return the error', async () => {
            // Arrange
            const id = '123';

            // Mock
            const expectedError = new Error('Failed to get product');
            const expectedResult = { result: null, error: expectedError };
            mockProductDataSource.getOne.mockResolvedValue(expectedResult);

            // Act
            const result = await productRepository.getProduct(id);

            // Assert
            expect(mockProductDataSource.getOne).toHaveBeenCalledWith(id);
            expect(result).toEqual({ result: null, error: expectedError });
        })
    })


});
