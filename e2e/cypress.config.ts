import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
	viewportHeight: 800,
	viewportWidth: 1400,
	e2e: {
		...nxE2EPreset(__filename, {
			cypressDir: 'src',
			webServerCommands: {
				default: 'npx nx run medicator:serve',
				production: 'npx nx run medicator:serve-static',
			},
			ciWebServerCommand: 'npx nx run medicator:serve-static',
			ciBaseUrl: 'http://localhost:4200',
		}),
		baseUrl: 'http://localhost:4200',
	},
});
