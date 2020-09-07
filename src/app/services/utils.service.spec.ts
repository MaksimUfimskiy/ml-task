import { UtilsService } from './utils.service';

describe('UtilsService', () => {
	describe('arrayMap method', () => {
		const arr = ['test1', 'test2'];
		const mapFn = (item: any, index: number, array: any[]) => ({
			value: item,
			index,
		});

		it('should throw invalid argument type error', () => {
			expect(() => UtilsService.arrayMap(('invalidArgument' as unknown) as Array<any>, mapFn)).toThrow(
				new TypeError('Argument is not an Array')
			);
		});

		it('should throw invalid function type error', () => {
			expect(() => UtilsService.arrayMap(arr, ([] as unknown) as (element: string, index: number, arr: string[]) => any)).toThrow(
				new TypeError('mapFn is not a function')
			);
		});

		it('should return empty array for given empty array', () => {
			expect(UtilsService.arrayMap([], mapFn)).toEqual([]);
		});

		it('should return mapped array', () => {
			expect(UtilsService.arrayMap(arr, mapFn)).toEqual([
				{
					value: 'test1',
					index: 0,
				},
				{
					value: 'test2',
					index: 1,
				},
			]);
		});
	});

	describe('arrayReduce method', () => {
		const arr = ['test1', 'test2'];
		const reduceFn = (element: string, index: number, array: string[], acc: any) => {
			acc[element] = index + element;

			return acc;
		};

		it('should throw invalid argument type error', () => {
			expect(() => UtilsService.arrayReduce(('invalidArgument' as unknown) as Array<any>, reduceFn, {})).toThrow(
				new TypeError('Argument is not an Array')
			);
		});

		it('should throw invalid function type error', () => {
			expect(() =>
				UtilsService.arrayReduce(arr, ({} as unknown) as (element: string, index: number, array: string[], acc: any) => any)
			).toThrow(new TypeError('reduceFn is not a function'));
		});

		it('should return empty array for given empty array', () => {
			expect(UtilsService.arrayReduce([], reduceFn)).toEqual([]);
		});

		it('should return reduced value', () => {
			expect(UtilsService.arrayReduce(arr, reduceFn, {})).toEqual({
				test1: '0test1',
				test2: '1test2',
			});
		});
	});

	describe('arrayFilter method', () => {
		const arr = [2, 3, -9, 0, -8, -1, 5];
		const filterFn = (element: number, index: number, array: number[]) => {
			return element < 0;
		};

		it('should throw invalid argument type error', () => {
			expect(() => UtilsService.arrayFilter(('invalidArgument' as unknown) as Array<any>, filterFn)).toThrow(
				new TypeError('Argument is not an Array')
			);
		});

		it('should throw invalid function type error', () => {
			expect(() =>
				UtilsService.arrayFilter(arr, ({} as unknown) as (element: number, index: number, array: number[]) => any)
			).toThrow(new TypeError('filterFn is not a function'));
		});

		it('should return empty array for given empty array', () => {
			expect(UtilsService.arrayFilter([], filterFn)).toEqual([]);
		});

		it('should return filtered array of negative numbers', () => {
			expect(UtilsService.arrayFilter(arr, filterFn)).toEqual([-9, -8, -1]);
		});
	});
});
