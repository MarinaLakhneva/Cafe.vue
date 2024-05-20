import { defineStore } from 'pinia'
import {ref} from "vue";


export const useStorePerson = defineStore("personStore", () => {
	const inputsPerson = ref([]);
	
	const add = () => {
		inputsPerson.value.push({ name: '' , id: Date.now()});
	};
	const remove = (index) => {
		inputsPerson.value.splice(index, 1);
	};
	
	return {
		inputsPerson,
		add,
		remove,
	};
});
