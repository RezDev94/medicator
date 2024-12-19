import { TestBed } from '@angular/core/testing';
import { ValidationPipe } from './validation.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { inject } from '@angular/core';
import { ValidationService } from '../../services/validation/validation.service';
import { FormBuilder, Validators } from '@angular/forms';

describe('ValidationPipe', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot()],
		}).compileComponents();
	});

	it('create an instance', () => {
		TestBed.runInInjectionContext(() => {
			const validationService = inject(ValidationService);
			const pipe = new ValidationPipe(validationService);
			expect(pipe).toBeTruthy();
		});
	});

	it('should return an appropriate message', () => {
		TestBed.runInInjectionContext(() => {
			const validationService = inject(ValidationService);
			const fb = inject(FormBuilder);
			const translateService = inject(TranslateService);
			const pipe = new ValidationPipe(validationService);
			const formControl = fb.control('', [Validators.required]);

			expect(pipe.transform(formControl, 'name')).toEqual(translateService.instant('validations.required', { field: 'name' }));
		});
	});
});
