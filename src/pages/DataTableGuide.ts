import DataTable from "datatables.net-bs5";
import "datatables.net-responsive-bs5";

export class DataTableGuide {
	salary: number = 320800;

	attached() {
		new DataTable("#ExampleTable", {
			responsive: true,
		});
	}
}
