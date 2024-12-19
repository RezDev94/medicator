import { DosageUnit } from '@enums/dosage-unit.enum';
import { DosagePipe } from './dosage.pipe';
import { IDosage } from '@models/dosage.model';

describe('DosagePipe', () => {
	const pipe = new DosagePipe();

	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('returns a formatted string', () => {
		const dosage: IDosage = {
			value: 1,
			unit: DosageUnit.Capsules
		};
		expect(pipe.transform(dosage)).toEqual(`${dosage.value} ${dosage.unit}`);
	});
});
