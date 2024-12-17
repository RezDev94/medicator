import { Injectable, signal } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class SearchState {
	searchKey = signal('');
}
