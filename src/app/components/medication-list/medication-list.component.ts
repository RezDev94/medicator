import { Component, computed, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { SearchState } from '../../states/search.state';
import { IMedication } from '@models/medication.model';
import { DosageUnit } from '@enums/dosage-unit.enum';
import { WeekDay } from '@enums/week-day.enum';
import { DosagePipe } from '../../pipes/dosage/dosage.pipe';
import { FrequencyPipe } from '../../pipes/frequency/frequency.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

const MEDICATION_DATA: IMedication[] = [
	{
		id: 1,
		name: 'Aspirin',
		dosage: {
			value: 2,
			unit: DosageUnit.TABLETS
		},
		frequency: {
			day: [WeekDay.SATURDAY, WeekDay.THURSDAY],
			time: ['12:30', '13:40']
		},
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 2,
		name: 'Insulin',
		dosage: {
			value: 20,
			unit: DosageUnit.MILLIGRAMS
		},
		frequency: {
			day: 'all',
			time: ['15:00']
		},
		createdAt: new Date(),
		updatedAt: new Date()
	},
];

@Component({
	selector: 'app-medication-list',
	imports: [
		CommonModule,
		MatTableModule,
		MatCardModule,
		DosagePipe,
		FrequencyPipe,
		TranslateModule
	],
	templateUrl: './medication-list.component.html',
	styleUrl: './medication-list.component.scss',
})
export class MedicationListComponent {
	searchKey$ = inject(SearchState).searchKey;
	dataSource$ = computed(() => this.searchKey$() ? this.searchMedication() : MEDICATION_DATA);

	displayedColumns: string[] = ['name', 'dosage', 'frequency', 'updatedAt'];

	private searchMedication(): IMedication[] {
		// case insensitive search
		return MEDICATION_DATA.filter((med) => med.name.toLowerCase().indexOf(this.searchKey$().toLowerCase()) !== -1);
	}
}
