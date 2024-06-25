import {createRouter, createWebHashHistory} from 'vue-router'
import AddPerson from './components/AddPerson.vue';
import AddMenu from './components/AddMenu.vue';
import ResultPrice from "./components/ResultPrice.vue";

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{ path: '/', component: AddPerson, name: "persons"},
		{ path: '/menu', component: AddMenu, name: "menu"},
		{ path: '/result', component: ResultPrice, name: "price"},
	],
})

export default router;
