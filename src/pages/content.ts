import { OverlayScrollbars } from "overlayscrollbars";
import { IEventAggregator, resolve } from "aurelia";

export class Content {
	readonly ea: IEventAggregator = resolve(IEventAggregator);
	pageLoading: boolean = false;

	constructor() {
		this.ea.subscribe("au:router:navigation-end", (event) => {
			this.pageLoading = false;
		});

		this.ea.subscribe("au:router:navigation-cancel", (event) => {
			this.pageLoading = false;
		});

		this.ea.subscribe("au:router:navigation-error", (event) => {
			this.pageLoading = false;
		});

		this.ea.subscribe("au:router:navigation-navigate", (event) => {
			this.pageLoading = true;
		});
	}

	attached() {
		OverlayScrollbars(document.getElementById("content"), {
			className: "os-theme-dark",
		});
	}
}
