import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/Home.vue";
import Preference from "./components/Preference.vue";

export default createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/preference",
			name: "preference",
			component: Preference,
		},
	],
});
