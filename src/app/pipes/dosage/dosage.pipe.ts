import { Pipe, PipeTransform } from '@angular/core';
import { IDosage } from '@models/dosage.model';

@Pipe({
	name: 'dosage',
})
export class DosagePipe implements PipeTransform {
	/**
	 * format the dosage
	 *
	 * examples:
	 * 2 tablets
	 * 300 mg
	 */
	transform(dosage: IDosage): string {
		return `${dosage.value} ${dosage.unit}`;
	}
}
