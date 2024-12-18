import { Pipe, PipeTransform } from '@angular/core';
import { ValidationService } from '../../services/validation/validation.service';
import { AbstractControl } from '@angular/forms';

@Pipe({
	name: 'validation',
	pure: false
})
export class ValidationPipe implements PipeTransform {
	constructor(
		private validationService: ValidationService
	) { }

	transform(formControl: AbstractControl | null, controlName: string): string {
		return this.validationService.generateError(formControl, controlName);
	}
}
