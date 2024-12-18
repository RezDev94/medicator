import { AfterViewInit, Component, DestroyRef, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

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
		MatIconModule,
		MatPaginatorModule
	],
	templateUrl: './medication-list.component.html',
	styleUrl: './medication-list.component.scss',
})
export class MedicationListComponent implements OnInit, AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	dialog = inject(MatDialog);
	dataStore = inject(DataStoreService);
	private destroyRef = inject(DestroyRef);

	searchKey$ = inject(SearchState).searchKey;
	medicationData$ = signal<IMedication[]>([]);

	dataSource = new MatTableDataSource<IMedication>(this.medicationData$());
	displayedColumns: string[] = ['name', 'dosage', 'frequency', 'updatedAt', 'action'];

	constructor() {
		effect(() => {
			if (this.searchKey$()) {
				this.dataSource.data = this.searchMedication();
			} else {
				this.dataSource.data = this.medicationData$();
			}
		});
	}

	ngOnInit(): void {
		this.medicationData$.set(this.dataStore.get());
		this.dataSource.data = this.medicationData$();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	private searchMedication(): IMedication[] {
		// case insensitive search
		return this.medicationData$().filter((med) => med.name.toLowerCase().indexOf(this.searchKey$().toLowerCase()) !== -1);
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
				this.medicationData$.set(this.dataStore.get());
				this.dataSource.data = this.medicationData$();
			}
		});
	}

	removeMedication(id: number): void {
		this.dataStore.remove(id);
		this.medicationData$.set(this.dataStore.get());
		this.dataSource.data = this.medicationData$();
	}
}
