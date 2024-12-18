import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

const findDuplicates = (arr: string[]): string[] => {
	const countMap = new Map();
	const duplicates = new Set<string>();

	for (const str of arr) {
		if (countMap.has(str)) {
			duplicates.add(str);
		} else {
			countMap.set(str, 1);
		}
	}

	return [...duplicates];
};

export function createSimilarValuesValidator(): ValidatorFn {
	return (control: AbstractControl<string[]>): ValidationErrors | null => {
		const value: string[] = control.value;

		if (!value || value.filter(val => !val).length !== 0) {
			return null;
		}

		return findDuplicates(value).length !== 0 ? { similarValues: true } : null;
	}
}
