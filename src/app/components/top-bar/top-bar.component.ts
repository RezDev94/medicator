import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { SearchState } from '../../states/search.state';

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
})
export class TopBarComponent implements OnInit {
	fb = inject(FormBuilder);
	searchKey$ = inject(SearchState).searchKey;

	searchForm = this.fb.group({
		key: this.fb.control('')
	});

	ngOnInit(): void {
		this.searchForm.get('key')?.valueChanges.subscribe({
			next: (val) => {
				this.searchKey$.set(val ?? '');
			}
		});
	}
}
