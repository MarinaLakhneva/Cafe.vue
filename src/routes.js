import {createRouter, createWebHistory} from 'vue-router'
import AddPerson from './components/AddPerson.vue';
import AddMenu from './components/AddMenu.vue';
import ResultPrice from "./components/ResultPrice.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: AddPerson, name: "persons"},
		{ path: '/menu', component: AddMenu, name: "menu",},
		{ path: '/result', component: ResultPrice, name: "price"},
	],
});

router.beforeEach((to, from, next) => {
	if (to.name !== 'persons'){
		if (from.name === undefined) {
			next('/');
		}
		else{
			next();
		}
	}
	else{
		next();
	}
});

export default router;