import { OverlayScrollbars } from "overlayscrollbars";

export class SideBar {
	attached() {
		OverlayScrollbars(document.getElementById("sidebar"), {
			scrollbars: {
				theme: "os-theme-light",
			},
		});
	}
}
