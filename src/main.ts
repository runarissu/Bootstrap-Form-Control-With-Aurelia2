import Aurelia from "aurelia";
import { RouterConfiguration } from "@aurelia/router";
import { MyApp } from "./my-app";
import { Content } from "./pages/content";
import "overlayscrollbars/overlayscrollbars.css";
import "select2/dist/css/select2.min.css";
import { Select2 } from "./components/select2";
import $ from "jquery";
import select2 from "select2";
import "select2-bootstrap-5-theme/dist/select2-bootstrap-5-theme.min.css";

Aurelia.register(
	RouterConfiguration.customize({ useUrlFragmentHash: false }),
	Content,
	Select2,
	select2($)
)
	.app(MyApp)
	.start();
