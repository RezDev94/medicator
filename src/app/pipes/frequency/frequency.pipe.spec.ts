import { TestBed } from '@angular/core/testing';
import { FrequencyPipe } from './frequency.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IFrequency } from '@models/frequency.model';
import { inject } from '@angular/core';
import { WeekDay } from '@enums/week-day.enum';

describe('FrequencyPipe', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot()],
		}).compileComponents();
	});

	it('create an instance', () => {
		TestBed.runInInjectionContext(() => {
			const pipe = new FrequencyPipe();
			expect(pipe).toBeTruthy();
		});
	});

	it('returns a formatted string', () => {
		TestBed.runInInjectionContext(() => {
			const pipe = new FrequencyPipe();
			const translateService = inject(TranslateService);
			const frequency1: IFrequency = {
				day: 'all',
				times: ['02:00']
			};
			const frequency2: IFrequency = {
				day: [WeekDay.Fri, WeekDay.Sat],
				times: ['02:00', '03:00']
			};
			expect(pipe.transform(frequency1)).toEqual(`${translateService.instant('phrases.every_day')} ${translateService.instant('phrases.at')} ${frequency1.times[0]}`);
			expect(pipe.transform(frequency2)).toEqual(`${WeekDay.Fri}, ${WeekDay.Sat} ${translateService.instant('phrases.at')} ${frequency2.times[0]}, ${frequency2.times[1]}`);
		});
	});
});
