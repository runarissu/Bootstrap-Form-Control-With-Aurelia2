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
			path: "services",
			component: () => import("./pages/services"),
			title: "บริการ",
			id: "services",
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

	// ซ่อน loading screen หลังจากที่หน้าเว็บโหลดเสร็จแล้ว
	attached() {
		// Bind this เพื่อให้สามารถเรียกใช้ method ได้ถูกต้อง
		this.hideLoading = this.hideLoading.bind(this);
		
		// รอให้หน้าเว็บโหลดเสร็จก่อนซ่อน loading screen
		window.addEventListener('load', this.hideLoading);
		
		// ถ้าหน้าเว็บโหลดเสร็จแล้วก่อนที่ event listener จะทำงาน
		if (document.readyState === 'complete') {
			this.hideLoading();
		}
		
		// ซ่อน loading screen หลังจาก 2 วินาที ในกรณีที่มีปัญหา
		setTimeout(this.hideLoading, 2000);
	}
	
	detached() {
		// ลบ event listener เมื่อไม่ได้ใช้งานแล้ว
		window.removeEventListener('load', this.hideLoading);
	}
	
	hideLoading() {
		const loadingScreen = document.getElementById('loading-screen');
		if (loadingScreen) {
			loadingScreen.classList.add('hidden');
			// ลบ loading screen ออกจาก DOM หลังจากที่ animation เสร็จสิ้น
			setTimeout(() => {
				if (loadingScreen.parentNode) {
					loadingScreen.parentNode.removeChild(loadingScreen);
				}
			}, 500);
		}
	}
}
