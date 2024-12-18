import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class EncryptionService {
	encrypt(data: string): string {
		return window.btoa(data);
	}

	decrypt(encryptedData: string): string {
		return window.atob(encryptedData);
	}
}
