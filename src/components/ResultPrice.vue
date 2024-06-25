<template>
	<div class="main">
		<div id="result">
			<p class="title">Счет</p>
			<div style="color: #06c719">
				<div style="color: #06c719">
					<div class="info" v-if="calculatedPrices">
						<div class="person">
							<div v-for="(person, index) in calculatedPrices.person_name" :key="index">
								{{person}}
							</div>
						</div>
						<div class="price">
							<div v-for="(price, index) in calculatedPrices.price" :key="index">
								{{price}} руб
							</div>
						</div>
					</div>
					<div class="debtors" v-if="calculatedArrears">
						<div class="debtor">
							<div v-for="(debtor, index) in calculatedArrears.debtor_name" :key="index">
								{{debtor}}  должна
							</div>
						</div>
						<div class="payer">
							<div v-for="(payer, index) in calculatedArrears.payer_name" :key="index">
								{{payer}}
							</div>
						</div>
						<div class="debt">
							<div v-for="(debt, index) in calculatedArrears.debt" :key="index">
								{{debt}} руб
							</div>
						</div>
					</div>
				</div>
			</div>
			<button class="nav" type="button" @click="back()">Назад</button>
		</div>
	</div>
</template>

<script setup>
const router = useRouter();
import {useRouter} from "vue-router";

import {useStorePerson} from "../stores/PersonStore"
import {useStoreMenu} from "../stores/MenuStore"

const storePerson = useStorePerson();
const storeMenu = useStoreMenu();


import { computed } from 'vue';

const calculatedPrices = computed(() => {
	const personPrice = storePerson.inputsPerson;
	const result = {price: [], person_name: []};
	console.log(result);

	for (let i = 0; i < storeMenu.inputsPrice.length; i++) {
		let infoProduct = storeMenu.inputsPrice[i];
		const price = infoProduct.price;
		const persons_length = infoProduct.personsId.length;

		for (let j = 0; j < infoProduct.personsId.length; j++) {
			let personId = infoProduct.personsId[j];
			const person = personPrice.find(item => item.id === personId);
			const index = result.person_name.findIndex(val => val === person.name);
			if (index !== -1) {
				result.price[index] += price / persons_length;
			} else {
				result.person_name.push(person.name);
				result.price.push(price / persons_length);
			}
		}
	}
	return result;
});


const calculatedArrears = computed(() => {
	const personPrice = storePerson.inputsPerson;
	const result = {debt: [], debtor_name: [], payer_name: []};

	for (let i = 0; i < storeMenu.inputsPrice.length; i++) {
		let infoProduct = storeMenu.inputsPrice[i];
		const price = infoProduct.price;
		const persons_length = infoProduct.personsId.length;

		for (let j = 0; j < infoProduct.personsId.length; j++) {
			let personId = infoProduct.personsId[j];
			let payerId = infoProduct.payerId;
			const person = personPrice.find(item => item.id === personId);
			const payer = personPrice.find(item => item.id === payerId);
			if (payer.name !== person.name) {
				result.payer_name.push(payer.name.slice(0, -1) + 'е');
				result.debtor_name.push(person.name);
				result.debt.push(price / persons_length);
			}
		}
	}
	return result;
});

const back = () => {
	router.push('/menu');
};
</script>

<style scoped>
button{
	color: #06c719;
}
.main{
	display: flex;
	justify-content: center;
}
#result{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 500px;
	max-width: 100%;
	padding: 20px 50px;
	border-radius: 30px;
	background-color: #414141;
}
.title{
	font-size: 22px;
}
.info{
	display: flex;
	margin-top: 20px;
}
.person{
	display: flex;
	flex-direction: column;
	align-items: start;
	width: 130px;
}
.price{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100px;
}
.debtors{
	display: flex;
	margin-top: 30px;
}
.debtor{
	display: flex;
	flex-direction: column;
	align-items: start;
	width: 200px;
}
.payer{
	display: flex;
	flex-direction: column;
	align-items: start;
	width: 100px;
}
.debt{
	margin-left: 20px;
}
.nav{
	margin-top: 30px;
	padding: 5px 0;
	width: 100px;
	border-radius: 30px;
	border: 1px solid #7c7c7c;
	background-color: #5f5f5f;
	font-size: 18px;
}
</style>
