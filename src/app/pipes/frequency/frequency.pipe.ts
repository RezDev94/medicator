import { inject, Pipe, PipeTransform } from '@angular/core';
import { IFrequency } from '@models/frequency.model';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
	name: 'frequency',
})
export class FrequencyPipe implements PipeTransform {
	translateService = inject(TranslateService);

	/**
	 * format the frequency
	 *
	 * examples:
	 * Sat at 12:30
	 * Fri, Sun at 12:30, 14:30
	 * Every day at 15:00
	 */
	transform(frequency: IFrequency): string {
		const day = Array.isArray(frequency.day) ? frequency.day.join(', ') : this.translateService.instant('phrases.every_day');
		const time = frequency.time.join(', ');

		return `
			${day}
			${this.translateService.instant('phrases.at')}
			${time}
		`;
	}
}
