import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@Component({
	imports: [
		RouterModule,
		TranslateModule,
		TopBarComponent
	],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'medicator';
}
