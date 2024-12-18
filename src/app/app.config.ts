import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MAT_MOMENT_DATE_FORMATS, provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDateFormats } from '@angular/material/core';

const CUSTOM_TIME_FORMAT: MatDateFormats = {
	...MAT_MOMENT_DATE_FORMATS,
	parse: {
		...MAT_MOMENT_DATE_FORMATS.parse,
		timeInput: null
	},
	display: {
		...MAT_MOMENT_DATE_FORMATS.display,
		timeInput: 'HH:mm',
		timeOptionLabel: 'HH:mm',
	},
};

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(appRoutes),
		provideAnimationsAsync(),
		provideHttpClient(),
		importProvidersFrom([
			TranslateModule.forRoot({
				defaultLanguage: 'en',
				loader: {
					provide: TranslateLoader,
					useFactory: HttpLoaderFactory,
					deps: [HttpClient]
				}
			})
		]),
		provideMomentDateAdapter(CUSTOM_TIME_FORMAT)
	],
};
