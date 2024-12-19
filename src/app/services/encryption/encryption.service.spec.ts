import { TestBed } from '@angular/core/testing';

import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
	let service: EncryptionService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EncryptionService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should encrypt a string using base64 encoding', () => {
		const data = 'test data';
		const encrypted = service.encrypt(data);
		expect(encrypted).toBe(window.btoa(data));
	});

	it('should decrypt a base64 encoded string', () => {
		const encryptedData = window.btoa('test data');
		const decrypted = service.decrypt(encryptedData);
		expect(decrypted).toBe('test data');
	});

	it('should handle empty strings for encryption and decryption', () => {
		const encrypted = service.encrypt('');
		expect(encrypted).toBe(window.btoa(''));

		const decrypted = service.decrypt('');
		expect(decrypted).toBe('');
	});
});
