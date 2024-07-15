import {createRouter, createWebHistory} from 'vue-router'
import AddPerson from '@/pages/personsPage.vue';
import AddMenu from '@/pages/menuPage.vue';
import ResultPrice from "@/pages/resultsPage.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: AddPerson, name: "persons"},
		{ path: '/menu', component: AddMenu, name: "menu",},
		{ path: '/result', component: ResultPrice, name: "price"},
	],
});

export default router;