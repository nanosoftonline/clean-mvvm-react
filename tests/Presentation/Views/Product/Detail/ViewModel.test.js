import 'regenerator-runtime/runtime'
import { renderHook, act } from '@testing-library/react-hooks';
import ProducDetailViewModel from '../../../../../src/Presentation/Views/Product/Detail/ViewModel';

const mockGetProductUseCase = {
    execute: jest.fn()
};

const mockUpdateProductUseCase = {
    execute: jest.fn()
};

const mockDeleteProductUseCase = {
    execute: jest.fn()
}

describe('ProducDetailViewModel', () => {
    let vm;
    beforeEach(() => {
        vm = renderHook(() => ProducDetailViewModel({
            GetProductUseCase: mockGetProductUseCase,
            DeleteProductUseCase: mockDeleteProductUseCase,
            UpdateProductUseCase: mockUpdateProductUseCase,
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should initialize with empty values and no error', () => {

        const { result } = vm;

        expect(result.current.error).toBe('');
        expect(result.current.id).toBeNull();
        expect(result.current.name).toBe('');
        expect(result.current.price).toBe(0);
    });

    describe('onChange', () => {

        it('should update values on change', async () => {
            const { result } = vm;

            //Arrange
            const inputData = {
                name: 'New Product',
                price: 10
            }

            //Act
            act(() => result.current.onChange(inputData.name, 'name'))
            act(() => result.current.onChange(inputData.price, 'price'))

            //Assert
            expect(result.current.name).toBe('New Product');
            expect(result.current.price).toBe(10);
        });
    })

    describe('getProduct', () => {

        it('should call GetProductUseCase and update state values on getProduct', async () => {
            const { result } = vm;
            //Arrange
            const productId = "1234";
            const expectedData = {
                id: 1,
                name: 'Test Product',
                price: 20
            }

            //Mock
            mockGetProductUseCase.execute.mockResolvedValue({ result: expectedData, error: null });

            //Act
            await act(async () => await result.current.getProduct(productId));

            //Assert
            expect(mockGetProductUseCase.execute).toHaveBeenCalledWith(productId);
            expect(result.current.error).toBe('');
            expect(result.current.id).toBe(expectedData.id);
            expect(result.current.name).toBe(expectedData.name);
            expect(result.current.price).toBe(expectedData.price);
            expect(result.current.error).toBe("");
        });
    })

    describe('updateProduct', () => {

        it('should call UpdateProductUseCase on updateProduct', async () => {

            const { result } = vm;
            //Arrange

            const inputData = {
                id: "123",
                name: 'New Product',
                price: 10
            }

            //Mock
            mockUpdateProductUseCase.execute.mockResolvedValue({ result: true, error: null });


            //Act
            act(() => result.current.onChange(inputData.name, 'name'))
            act(() => result.current.onChange(inputData.price, "price"))

            await act(async () => await result.current.updateProduct(inputData.id));

            //Assert
            expect(mockUpdateProductUseCase.execute).toHaveBeenCalledWith(inputData.id, { id: null, name: inputData.name, price: inputData.price });
            expect(result.current.error).toBe("");

        });

        it('should call UpdateProductUseCase and update error on updateProduct', async () => {
            const { result } = vm;
            //Arrange
            const inputData = {
                id: "123",
                name: 'New Product',
                price: 10
            }

            //Mock
            mockUpdateProductUseCase.execute.mockResolvedValue({ result: null, error: Error('Update failed') });

            //Act
            act(() => result.current.onChange(inputData.name, 'name'))
            act(() => result.current.onChange(inputData.price, "price"))

            await act(async () => await result.current.updateProduct(inputData.id))

            //Assert
            expect(mockUpdateProductUseCase.execute).toHaveBeenCalledWith(inputData.id, { id: null, name: inputData.name, price: inputData.price });
            expect(result.current.error).toBe('Update failed');
        });

    })

    describe('deleteProduct', () => {

        it('should call DeleteProductUseCase on deleteProduct', async () => {
            const { result } = vm;
            //Arrange
            const productId = "5678"

            //Mock
            mockDeleteProductUseCase.execute.mockResolvedValue({ result: true, error: null });

            //Act
            await act(async () => await result.current.deleteProduct(productId));

            //Assert
            expect(mockDeleteProductUseCase.execute).toHaveBeenCalledWith(productId);
            expect(result.current.error).toBe('');
        });

        it('should call DeleteProductUseCase and update error on deleteProduct', async () => {
            const { result } = vm;
            //Arrange
            const productId = "5678"

            //Mock
            mockDeleteProductUseCase.execute.mockResolvedValue({ result: null, error: Error('Delete failed') });

            //Act
            await act(async () => await result.current.deleteProduct(productId));

            //Assert
            expect(mockDeleteProductUseCase.execute).toHaveBeenCalledWith(productId);
            expect(result.current.error).toBe('Delete failed');
        });

    });
});
