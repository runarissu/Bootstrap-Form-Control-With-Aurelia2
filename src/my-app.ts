import { OverlayScrollbars } from "overlayscrollbars";

export class MyApp {
	static routes = [
		{
			path: ["", "Home"],
			component: () => import("./pages/Home"),
			title: "Home",
			id: "Home",
		},
		{
			path: ["FormControl"],
			component: () => import("./pages/FormControl"),
			title: "Form Control",
			id: "FormControl",
		},
		{
			path: "CheckRadio",
			component: () => import("./pages/CheckRadio"),
			title: "Check & Radio",
			id: "CheckRadio",
		},
		{
			path: "Select2",
			component: () => import("./pages/Select2Guide"),
			title: "Select2",
			id: "Select2",
		},
		{
			path: "TextareaGuide",
			component: () => import("./pages/TextareaGuide"),
			title: "Textarea",
			id: "Textarea",
		},
		{
			path: "Tab",
			component: () => import("./pages/Tab"),
			title: "Tab",
			id: "Tab",
		},
		{
			path: "DateRange",
			component: () => import("./pages/DateRange"),
			title: "Date Range",
			id: "DateRange",
		},
		{
			path: "Accordion",
			component: () => import("./pages/Accordion"),
			title: "Accordion",
			id: "Accordion",
		},
		{
			path: "Navbar",
			component: () => import("./pages/Navbar"),
			title: "Navbar",
			id: "Navbar",
		},
		{
			path: "NavGuide",
			component: () => import("./pages/NavGuide"),
			title: "Nav Guide",
			id: "NavGuide",
		},
		{
			path: "Dropdown",
			component: () => import("./pages/Dropdown"),
			title: "Dropdown Guide",
			id: "Dropdown",
		},
		{
			path: "DataTable",
			component: () => import("./pages/DataTableGuide"),
			title: "Data Table",
			id: "DataTable",
		},
		{
			path: "Validation",
			component: () => import("./pages/Validation"),
			title: "Validation",
			id: "Validation",
		},
	];

	// เก็บ reference ของ router
	private router: unknown;

	attached() {
		const sidebar = document.getElementById("sidebar");
		if (sidebar) {
			OverlayScrollbars(sidebar, {
				className: "os-theme-dark",
			});
		}
	}

	detached() {
		// ลบ event listener เมื่อไม่ได้ใช้งานแล้ว
		window.removeEventListener("load", this.hideLoading);
		this.removeRouterEvents();
	}

	hideLoading() {
		const loadingScreen = document.getElementById("loading-screen");
		if (loadingScreen) {
			loadingScreen.classList.add("hidden");
			// ลบ loading screen ออกจาก DOM หลังจากที่ animation เสร็จสิ้น
			setTimeout(() => {
				if (loadingScreen.parentNode) {
					loadingScreen.parentNode.removeChild(loadingScreen);
				}
			}, 500);
		}
	}

	// ตั้งค่า event listener สำหรับ router
	setupRouterEvents() {
		// ใช้ setTimeout เพื่อให้แน่ใจว่า router ถูกโหลดเรียบร้อยแล้ว
		setTimeout(() => {
			// หา router element
			const routerLinks = document.querySelectorAll("a[load]");

			// เพิ่ม event listener สำหรับทุก router link
			routerLinks.forEach((link) => {
				link.addEventListener("click", this.showPageLoading);
			});

			// ตรวจจับเมื่อหน้าโหลดเสร็จแล้ว
			document.addEventListener("aurelia-composed", this.hidePageLoading);
			document.addEventListener(
				"aurelia-router-navigation-complete",
				this.hidePageLoading
			);
		}, 500);
	}

	// ลบ event listener สำหรับ router
	removeRouterEvents() {
		const routerLinks = document.querySelectorAll("a[load]");
		routerLinks.forEach((link) => {
			link.removeEventListener("click", this.showPageLoading);
		});

		document.removeEventListener("aurelia-composed", this.hidePageLoading);
		document.removeEventListener(
			"aurelia-router-navigation-complete",
			this.hidePageLoading
		);
	}

	// แสดง loading animation เมื่อเปลี่ยนหน้า
	showPageLoading() {
		const pageLoadingScreen = document.getElementById(
			"page-loading-screen"
		);
		if (pageLoadingScreen) {
			pageLoadingScreen.classList.add("active");
		}
	}

	// ซ่อน loading animation หลังจากเปลี่ยนหน้าเสร็จ
	hidePageLoading() {
		const pageLoadingScreen = document.getElementById(
			"page-loading-screen"
		);
		if (pageLoadingScreen) {
			pageLoadingScreen.classList.remove("active");
		}
	}
}
