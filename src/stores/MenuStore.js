import { defineStore } from 'pinia'
import {ref} from "vue";


export const useStoreMenu = defineStore("menuStore", () => {
	const inputsPrice = ref([]);
	
	const add = () => {
		inputsPrice.value.push({ product: '', price: '', showPersons: false, personsId:[], showPayer: false, payerId: '', id: Date.now()});
	};
	const remove = (id) => {
		inputsPrice.value = inputsPrice.value.filter(item => item.id !== id);
	};
	
	const togglePersons = (id) => {
		let input = inputsPrice.value.find(item => item.id === id)
		input.showPersons = !input.showPersons;
	}
	
	const togglePayer = (id) => {
		let input = inputsPrice.value.find(item => item.id === id)
		input.showPayer = !input.showPayer;
	}
	
	return {
		inputsPrice,
		add,
		remove,
		togglePersons,
		togglePayer,
	};
});
