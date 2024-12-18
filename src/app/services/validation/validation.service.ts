import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
	providedIn: 'root'
})
export class ValidationService {
	constructor(
		private translateService: TranslateService
	) { }

	generateError(formControl: AbstractControl | null, controlName: string): string {
		if (formControl?.hasError('required')) {
			return this.translateService.instant('validations.required', {
				field: controlName
			});
		} else if (formControl?.hasError('minlength')) {
			return this.translateService.instant('validations.minLength', {
				field: controlName,
				length: formControl.getError('minlength').requiredLength
			});
		} else if (formControl?.hasError('positiveFloat')) {
			return this.translateService.instant('validations.positive', {
				field: controlName
			});
		} else if (formControl?.hasError('similarValues')) {
			return this.translateService.instant('validations.similar', {
				field: controlName
			});
		}

		return '';
	}
}
