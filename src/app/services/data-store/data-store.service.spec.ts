import { TestBed } from '@angular/core/testing';
import { DataStoreService } from './data-store.service';
import { EncryptionService } from '../encryption/encryption.service';
import { IMedication } from '@models/medication.model';
import { DosageUnit } from '@enums/dosage-unit.enum';

jest.mock('../encryption/encryption.service');
jest.mock('@utils/random.util', () => ({
	randomNumber: jest.fn(() => 12345),
}));

describe('DataStoreService', () => {
	let service: DataStoreService;
	let encryptionService: EncryptionService;

	const mockEncrypt = jest.fn((data: string) => `encrypted-${data}`);
	const mockDecrypt = jest.fn((data: string) => data.replace('encrypted-', ''));

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DataStoreService,
				{
					provide: EncryptionService,
					useValue: {
						encrypt: mockEncrypt,
						decrypt: mockDecrypt
					}
				},
			],
		});

		service = TestBed.inject(DataStoreService);
		encryptionService = TestBed.inject(EncryptionService);

		Object.defineProperty(window, 'localStorage', {
			value: {
				getItem: jest.fn(),
				setItem: jest.fn(),
				removeItem: jest.fn(),
			},
			writable: true,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should store a new medication', () => {
		const newMedication: any = {
			name: 'Aspirin',
			dosage: {
				value: 10,
				unit: DosageUnit.Tablets
			},
			frequency: {
				day: 'all',
				times: ['02:00']
			}
		};

		jest.spyOn(window.localStorage, 'getItem').mockReturnValue(null);

		service.store(newMedication);

		const expectedMedication: IMedication = {
			...newMedication,
			id: 12345,
			createdAt: expect.anything(),
			updatedAt: expect.anything(),
		};

		const storedItem = jest.spyOn(window.localStorage, 'setItem').mock.calls[0][1];
		const decryptedData = JSON.parse(mockDecrypt(storedItem.replace('encrypted-', '')));

		expect(decryptedData).toHaveLength(1);
		expect(decryptedData[0]).toMatchObject(expectedMedication);

		expect(new Date(decryptedData[0].createdAt)).toBeInstanceOf(Date);
		expect(new Date(decryptedData[0].updatedAt)).toBeInstanceOf(Date);
	});

	it('should remove a medication by ID', () => {
		const medications: IMedication[] = [
			{
				id: 12345,
				name: 'Aspirin',
				dosage: {
					value: 10,
					unit: DosageUnit.Tablets
				},
				frequency: {
					day: 'all',
					times: ['02:00']
				},
				createdAt: new Date(),
				updatedAt: new Date()
			},
		];

		jest.spyOn(window.localStorage, 'getItem').mockReturnValue(`encrypted-${JSON.stringify(medications)}`);

		service.remove(12345);

		expect(window.localStorage.setItem).toHaveBeenCalledWith(
			'medications',
			`encrypted-${JSON.stringify([])}`
		);
	});

	it('should get all medications', () => {
		const medications: IMedication[] = [
			{
				id: 12345,
				name: 'Aspirin',
				dosage: {
					value: 10,
					unit: DosageUnit.Tablets
				},
				frequency: {
					day: 'all',
					times: ['02:00']
				},
				createdAt: new Date(),
				updatedAt: new Date()
			},
		];

		jest.spyOn(window.localStorage, 'getItem').mockReturnValue(`encrypted-${JSON.stringify(medications)}`);

		const result = service.get();

		expect(result).toEqual(JSON.parse(JSON.stringify(medications)));
		expect(encryptionService.decrypt).toHaveBeenCalledWith(`encrypted-${JSON.stringify(medications)}`);
	});

	it('should return an empty array if no medications exist', () => {
		jest.spyOn(window.localStorage, 'getItem').mockReturnValue(null);

		const result = service.get();

		expect(result).toEqual([]);
	});
});
