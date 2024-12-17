import { IDosage } from "./dosage.model";
import { IFrequency } from "./frequency.model";

export interface IMedication {
	id: number;
	name: string;
	dosage: IDosage;
	frequency: IFrequency;
	createdAt: Date;
	updatedAt: Date;
}
