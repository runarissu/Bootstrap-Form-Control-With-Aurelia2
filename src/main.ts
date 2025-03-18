import Aurelia from "aurelia";
import { RouterConfiguration } from "@aurelia/router";
import { MyApp } from "./my-app";
import { Content } from "./pages/content";
import "overlayscrollbars/overlayscrollbars.css";

Aurelia.register(
	RouterConfiguration.customize({ useUrlFragmentHash: false }),
	Content
)
	.app(MyApp)
	.start();
