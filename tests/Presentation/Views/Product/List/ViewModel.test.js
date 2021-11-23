/**
 * @jest-environment jsdom
 */
import useProductListViewModel from '../../../../../src/Presentation/Views/Product/List/ViewModel';
import { renderHook, act } from '@testing-library/react-hooks'
import mockGetProductsUseCase from '../../../../../src/Domain/UseCase/Product/GetProducts'
import "babel-polyfill"

describe("Product List View Model", () => {

    it('should return empty product list', () => {
        //GIVEN
        const { result } = renderHook(() => useProductListViewModel())

        //WHEN

        //THEN
        expect(result.current.products).toEqual([])
    });

    it('should return expected result after getProducts is called', async () => {
        //GIVEN
        const { result } = renderHook(() => useProductListViewModel())
        const expectedResult = [{ name: "Product One", price: 99 }, { name: "Product Two", price: 99 }]
        mockGetProductsUseCase.invoke = jest.fn().mockImplementation(() => Promise.resolve({ result: expectedResult, error: "" }));

        //WHEN
        await act(async () => result.current.getProducts())

        //THEN
        expect(result.current.products).toBe(expectedResult)
    });
})
