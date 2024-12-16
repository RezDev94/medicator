import { Route } from '@angular/router';

export const appRoutes: Route[] = [
	{
		path: '',
		loadComponent: () => import('./components/medication-list.component').then(m => m.MedicationListComponent)
	}
];
