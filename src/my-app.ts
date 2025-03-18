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
}
