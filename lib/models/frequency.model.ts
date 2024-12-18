import { WeekDay } from "../enums/week-day.enum";

export interface IFrequency {
	day: 'all' | WeekDay[];
	times: string[];
}
