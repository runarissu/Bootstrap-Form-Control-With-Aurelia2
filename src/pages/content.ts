import { OverlayScrollbars } from "overlayscrollbars";
import { IEventAggregator, resolve } from "aurelia";

export class Content {
	readonly ea: IEventAggregator = resolve(IEventAggregator);
	pageLoading: boolean = false;

	constructor() {
		this.ea.subscribe("au:router:navigation-end", (event) => {
			const overlay = document.querySelector(".page-loading-overlay");
			overlay.classList.add("fade-out");
			// Wait for animation to complete before hiding
			setTimeout(() => {
				this.pageLoading = false;
			}, 100);
		});

		this.ea.subscribe("au:router:navigation-cancel", (event) => {
			const overlay = document.querySelector(".page-loading-overlay");
			overlay.classList.add("fade-out");
			// Wait for animation to complete before hiding
			setTimeout(() => {
				this.pageLoading = false;
			}, 100);
		});

		this.ea.subscribe("au:router:navigation-error", (event) => {
			const overlay = document.querySelector(".page-loading-overlay");
			overlay.classList.add("fade-out");
			// Wait for animation to complete before hiding
			setTimeout(() => {
				this.pageLoading = false;
			}, 100);
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
