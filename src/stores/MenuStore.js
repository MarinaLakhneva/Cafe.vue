import { defineStore } from 'pinia'
import {ref} from "vue";


export const useStoreMenu = defineStore("menuStore", () => {
	const inputsPrice = ref([]);
	
	const add = () => {
		inputsPrice.value.push({ product: '', price: '', showPerson: false, personsId:[], id: Date.now()});
	};
	const remove = (id) => {
		inputsPrice.value = inputsPrice.value.filter(item => item.id !== id);
	};
	
	const togglePersons = (id) => {
		let input = inputsPrice.value.find(item => item.id === id)
		input.showPerson = !input.showPerson;
	}
	
	return {
		inputsPrice,
		add,
		remove,
		togglePersons,
	};
});
