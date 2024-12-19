import { TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core';

describe('ValidationService', () => {
	let service: ValidationService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot()]
		});
		service = TestBed.inject(ValidationService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should return required error message', () => {
		TestBed.runInInjectionContext(() => {
			const fb = inject(FormBuilder);
			const translateService = inject(TranslateService);
			const formControl = fb.control('', [Validators.required]);

			const errorMessage = service.generateError(formControl, 'name');
			expect(errorMessage).toBe(translateService.instant('validations.required', { field: 'name' }));
		});
	});
});
