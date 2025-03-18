import Aurelia from "aurelia";
import { RouterConfiguration } from "@aurelia/router";
import { MyApp } from "./my-app";
import { Content } from "./pages/content";
import "overlayscrollbars/overlayscrollbars.css";
import * as Select2 from "./components/select2";
import "select2/dist/css/select2.min.css";

Aurelia.register(
	RouterConfiguration.customize({ useUrlFragmentHash: false }),
	Content,
	Select2
)
	.app(MyApp)
	.start();
