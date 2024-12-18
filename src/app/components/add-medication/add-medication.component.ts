import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { DosageUnit } from '@enums/dosage-unit.enum';
import { WeekDay } from '@enums/week-day.enum';
import { Moment } from 'moment';
import { CommonModule } from '@angular/common';
import { ValidationPipe } from '../../pipes/validation/validation.pipe';
import { createPositiveFloatValidator } from '../../validators/positive-float.validator';
import { createSimilarValuesValidator } from '../../validators/similar-values.validator';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-add-medication',
	imports: [
		CommonModule,
		MatDialogActions,
		MatDialogClose,
		MatDialogTitle,
		MatDialogContent,
		MatButtonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatDividerModule,
		MatButtonToggleModule,
		MatTimepickerModule,
		MatIconModule,
		TranslateModule,
		ValidationPipe
	],
	templateUrl: './add-medication.component.html',
	styleUrl: './add-medication.component.scss',
})
export class AddMedicationComponent implements OnInit {
	fb = inject(FormBuilder);
	dialogRef = inject(MatDialogRef<AddMedicationComponent>);
	private destroyRef = inject(DestroyRef);

	addMedicationForm = this.fb.group({
		name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
		dosage: this.fb.group({
			value: this.fb.control('', [Validators.required, createPositiveFloatValidator()]),
			unit: this.fb.control('', [Validators.required])
		}),
		frequency: this.fb.group({
			day: this.fb.control<'all' | string[]>([], [Validators.required]),
			times: this.fb.array<FormControl<string | Moment | null>>([this.fb.control<string | Moment>('', [Validators.required])], [Validators.required, createSimilarValuesValidator()])
		})
	});
	selectedDays$ = signal<string[]>([]);
	isEveryDay$ = signal(false);
	isFormSubmitted$ = signal(false);

	ngOnInit(): void {
		this.formatTimeAfterSelect();
	}

	get dosageUnits(): { key: string; value: string }[] {
		return Object.keys(DosageUnit).map((key) => ({
			key,
			value: (DosageUnit as any)[key]
		}));
	}

	get frequencyDay(): { key: string; value: string }[] {
		return Object.keys(WeekDay).map((key) => ({
			key,
			value: (WeekDay as any)[key]
		}));
	}

	get frequencyTimes(): FormArray {
		return this.addMedicationForm.get('frequency.times') as FormArray;
	}

	formatTimeAfterSelect(): void {
		this.addMedicationForm.get('frequency.times')?.valueChanges.pipe(
			takeUntilDestroyed(this.destroyRef)
		).subscribe(value => {
			if (value) {
				const formattedValue = value.filter(time => time).map(time => {
					if (typeof time === 'object') {
						const momentDate = time as unknown as Moment;
						return momentDate.format('HH:mm');
					} else {
						return time;
					}
				});
				this.addMedicationForm.get('frequency.times')?.patchValue(formattedValue, { emitEvent: false });
			}
		});
	}

	onSelectionChange(event: MatButtonToggleChange) {
		const selectedValue = event.value;
		if (selectedValue === 'all') {
			if (event.source.checked) {
				this.selectedDays$.set(this.frequencyDay.map(day => day.value));
				this.isEveryDay$.set(true);
			} else {
				this.selectedDays$.set([]);
				this.isEveryDay$.set(false);
			}
		} else {
			const foundDayIndex = this.selectedDays$().findIndex(x => x === selectedValue);
			if (event.source.checked) {
				const selectedValues = [...this.selectedDays$(), selectedValue];
				// sort selected days
				this.selectedDays$.set(this.frequencyDay.filter(option => selectedValues.includes(option.value)).map(option => option.value));
				if (this.selectedDays$().length === 7) {
					this.isEveryDay$.set(true);
				}
			} else {
				if (foundDayIndex !== -1) {
					this.selectedDays$().splice(foundDayIndex, 1);
				}
				this.isEveryDay$.set(false);
			}
		}
		if (this.isEveryDay$()) {
			this.addMedicationForm.get('frequency.day')?.setValue('all');
		} else {
			this.addMedicationForm.get('frequency.day')?.setValue(this.selectedDays$());
		}
	}

	addTime(): void {
		this.frequencyTimes.push(this.fb.control('', [Validators.required]));
		this.frequencyTimes.updateValueAndValidity();
	}

	removeTime(index: number): void {
		this.frequencyTimes.removeAt(index);
		this.frequencyTimes.updateValueAndValidity();
	}

	submitAddMedication(): void {
		this.isFormSubmitted$.set(true);

		if (this.addMedicationForm.valid) {
			this.dialogRef.close(this.addMedicationForm.value);
		}
	}
}
