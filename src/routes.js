import {createRouter, createWebHashHistory} from 'vue-router'
import AddPerson from './components/AddPerson.vue';
import AddMenu from './components/AddMenu.vue';

export default createRouter({
	history: createWebHashHistory(),
	routes: [
		{ path: '/', component: AddPerson, alias: '/'},
		{ path: '/menu', component: AddMenu },
	]
})
