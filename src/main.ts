import Aurelia from "aurelia";
import { RouterConfiguration } from "@aurelia/router";
import { MyApp } from "./my-app";
import { Content } from "./pages/content";
import "overlayscrollbars/overlayscrollbars.css";
import "select2/dist/css/select2.min.css";
import { Select2 } from "./components/select2";
import select2 from "select2";
import "daterangepicker";
import "daterangepicker/daterangepicker.css";
import { DateRangePicker } from "./components/date-range-picker";
import "select2-bootstrap-5-theme/dist/select2-bootstrap-5-theme.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";
import { SideBar } from "./pages/SideBar";

Aurelia.register(
	RouterConfiguration.customize({ useUrlFragmentHash: false }),
	Content,
	Select2,
	SideBar,
	select2($),
	DateRangePicker
)
	.app(MyApp)
	.start();
