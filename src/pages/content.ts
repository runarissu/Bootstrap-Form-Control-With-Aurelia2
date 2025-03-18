import { OverlayScrollbars } from "overlayscrollbars";

export class Content {
	attached() {
		OverlayScrollbars(document.getElementById("content"), {
			className: "os-theme-dark",
		});
	}
}
