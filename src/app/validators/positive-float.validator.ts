import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createPositiveFloatValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value;

		if (!value) {
			return null;
		}

		const positiveFloat = /^[0-9.]*$/.test(value);

		return !positiveFloat ? { positiveFloat: true } : null;
	}
}
