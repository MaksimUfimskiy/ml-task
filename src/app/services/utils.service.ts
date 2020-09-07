export class UtilsService {
	static arrayMap<T>(arr: T[], mapFn: (element: T, index: number, arr: T[]) => any): any[] {
		if (!Array.isArray(arr)) {
			throw new TypeError('Argument is not an Array');
		}

		if (typeof mapFn !== 'function') {
			throw new TypeError('mapFn is not a function');
		}

		if (!arr.length) {
			return arr;
		}

		const mappedArr = [];

		for (let i = 0; i < arr.length; i++) {
			mappedArr.push(mapFn(arr[i], i, arr));
		}

		return mappedArr;
	}

	static arrayReduce<T>(arr: T[], reduceFn: (element: T, index: number, arr: T[], acc: any) => any, initialValue: any = 0): any {
		if (!Array.isArray(arr)) {
			throw new TypeError('Argument is not an Array');
		}

		if (typeof reduceFn !== 'function') {
			throw new TypeError('reduceFn is not a function');
		}

		if (!arr.length) {
			return arr;
		}

		for (let i = 0; i < arr.length; i++) {
			initialValue = reduceFn(arr[i], i, arr, initialValue);
		}

		return initialValue;
	}

	static arrayFilter<T>(arr: T[], filterFn: (element: T, index: number, arr: T[]) => boolean): T[] {
		if (!Array.isArray(arr)) {
			throw new TypeError('Argument is not an Array');
		}

		if (typeof filterFn !== 'function') {
			throw new TypeError('filterFn is not a function');
		}

		if (!arr.length) {
			return arr;
		}

		const filteredArr: T[] = [];

		for (let i = 0; i < arr.length; i++) {
			if (filterFn(arr[i], i, arr)) {
				filteredArr.push(arr[i]);
			}
		}

		return filteredArr;
	}
}
