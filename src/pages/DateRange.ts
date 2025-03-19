export class DateRange {
	today: string = new Date();
	maxDate: Date = new Date();

	startDate: string = "07/03/2025";
	endDate: string = "25/03/2025";

	constructor() {
		this.maxDate.setDate(this.maxDate.getDate() + 14);
	}
}
