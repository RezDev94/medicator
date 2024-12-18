import { Component, computed, DestroyRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { SearchState } from '../../states/search.state';
import { IMedication } from '@models/medication.model';
import { DosagePipe } from '../../pipes/dosage/dosage.pipe';
import { FrequencyPipe } from '../../pipes/frequency/frequency.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddMedicationComponent } from '../add-medication/add-medication.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataStoreService } from '../../services/data-store/data-store.service';
import { MatIconModule } from '@angular/material/icon';

const MEDICATION_DATA = signal<IMedication[]>([]);

@Component({
	selector: 'app-medication-list',
	imports: [
		CommonModule,
		MatTableModule,
		MatCardModule,
		DosagePipe,
		FrequencyPipe,
		TranslateModule,
		MatButtonModule,
		MatIconModule
	],
	templateUrl: './medication-list.component.html',
	styleUrl: './medication-list.component.scss',
})
export class MedicationListComponent implements OnInit {
	@ViewChild(MatTable) table!: MatTable<IMedication>;

	searchKey$ = inject(SearchState).searchKey;
	dialog = inject(MatDialog);
	dataStore = inject(DataStoreService);
	private destroyRef = inject(DestroyRef);

	dataSource$ = computed(() => this.searchKey$() ? this.searchMedication() : MEDICATION_DATA());

	displayedColumns: string[] = ['name', 'dosage', 'frequency', 'updatedAt', 'action'];

	ngOnInit(): void {
		MEDICATION_DATA.set(this.dataStore.get());
	}

	private searchMedication(): IMedication[] {
		// case insensitive search
		return MEDICATION_DATA().filter((med) => med.name.toLowerCase().indexOf(this.searchKey$().toLowerCase()) !== -1);
	}

	addMedication(): void {
		const dialogRef = this.dialog.open(AddMedicationComponent, {
			width: '700px',
			disableClose: true,
			closeOnNavigation: true
		});

		dialogRef.afterClosed().pipe(
			takeUntilDestroyed(this.destroyRef)
		).subscribe(result => {
			if (result) {
				this.dataStore.store(result);
				MEDICATION_DATA.set(this.dataStore.get());
				this.table.renderRows();
			}
		});
	}

	removeMedication(id: number): void {
		this.dataStore.remove(id);
		MEDICATION_DATA.set(this.dataStore.get());
		this.table.renderRows();
	}
}
