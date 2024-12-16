import { IDosage } from "@models/dosage.model";
import { IFrequency } from "@models/frequency.model";

export interface IMedication {
	id: number;
	name: string;
	dosage: IDosage;
	frequency: IFrequency;
	createdAt: string;
	updatedAt: string;
}
