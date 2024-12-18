import { inject, Injectable } from '@angular/core';
import { IMedication } from '@models/medication.model';
import { EncryptionService } from '../encryption/encryption.service';
import { randomNumber } from '@utils/random.util';

const MEDICATION_KEY = 'medications';

@Injectable({
	providedIn: 'root'
})
export class DataStoreService {
	encryptService = inject(EncryptionService);

	store(newMedication: any): void {
		const data = this.getData();

		const medication: IMedication = { ...newMedication, id: randomNumber(10000, 99999), createdAt: new Date(), updatedAt: new Date() };

		if (data) {
			data.push(medication);
			localStorage.setItem(MEDICATION_KEY, this.encryptService.encrypt(JSON.stringify(data)));
		} else {
			localStorage.setItem(MEDICATION_KEY, this.encryptService.encrypt(JSON.stringify([medication])));
		}
	}

	remove(id: number): void {
		const data = this.getData();

		if (data) {
			const itemIndex = data.findIndex(x => x.id === id);
			if (itemIndex !== -1) {
				data.splice(itemIndex, 1);
				localStorage.setItem(MEDICATION_KEY, this.encryptService.encrypt(JSON.stringify(data)));
			}
		}
	}

	get(): IMedication[] {
		return this.getData() ?? [];
	}

	private getData(): IMedication[] | null {
		const data = localStorage.getItem(MEDICATION_KEY);

		if (data) {
			return JSON.parse(this.encryptService.decrypt(data));
		}

		return null;
	}
}
