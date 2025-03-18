export class MyApp {
	static routes = [
		{
			path: ["", "FormControl"],
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
			path: "contact",
			component: () => import("./pages/contact"),
			title: "ติดต่อเรา",
			id: "contact",
		},
		{
			path: "faq",
			component: () => import("./pages/faq"),
			title: "คำถามที่พบบ่อย",
			id: "faq",
		},
	];

	// เก็บ reference ของ router
	private router: unknown;

	// ซ่อน loading screen หลังจากที่หน้าเว็บโหลดเสร็จแล้ว
	attached() {
		// // Bind this เพื่อให้สามารถเรียกใช้ method ได้ถูกต้อง
		// this.hideLoading = this.hideLoading.bind(this);
		// this.showPageLoading = this.showPageLoading.bind(this);
		// this.hidePageLoading = this.hidePageLoading.bind(this);
		// // รอให้หน้าเว็บโหลดเสร็จก่อนซ่อน loading screen
		// window.addEventListener('load', this.hideLoading);
		// // ถ้าหน้าเว็บโหลดเสร็จแล้วก่อนที่ event listener จะทำงาน
		// if (document.readyState === 'complete') {
		// 	this.hideLoading();
		// }
		// // ซ่อน loading screen หลังจาก 2 วินาที ในกรณีที่มีปัญหา
		// setTimeout(this.hideLoading, 2000);
		// // ตรวจจับการเปลี่ยนหน้าและแสดง loading animation
		// this.setupRouterEvents();
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
