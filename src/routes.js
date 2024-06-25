import {createRouter, createWebHashHistory} from 'vue-router'
import AddPerson from './components/AddPerson.vue';
import AddMenu from './components/AddMenu.vue';
import ResultPrice from "./components/ResultPrice.vue";

export default createRouter({
	history: createWebHashHistory(),
	routes: [
		{ path: '/', component: AddPerson},
		{ path: '/menu', component: AddMenu},
		{ path: '/result', component: ResultPrice},
	],
})
