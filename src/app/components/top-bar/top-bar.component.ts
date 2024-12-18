import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { SearchState } from '../../states/search.state';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-top-bar',
	imports: [
		TranslateModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule
	],
	templateUrl: './top-bar.component.html',
	styleUrl: './top-bar.component.scss',
	host: {
		'class': 'flex flex-col gap-[20px] justify-between items-center md:flex-row'
	}
})
export class TopBarComponent implements OnInit {
	private fb = inject(FormBuilder);
	private destroyRef = inject(DestroyRef);

	searchKey$ = inject(SearchState).searchKey;

	searchForm = this.fb.group({
		key: this.fb.control('')
	});

	ngOnInit(): void {
		this.searchForm.get('key')?.valueChanges.pipe(
			debounceTime(500),
			takeUntilDestroyed(this.destroyRef)
		).subscribe({
			next: (val) => {
				this.searchKey$.set(val ?? '');
			}
		});
	}
}
