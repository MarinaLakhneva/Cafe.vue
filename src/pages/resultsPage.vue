<template>
	<div class="main">
		<div id="result">
			<p class="title">Счет</p>
			<div style="color: #06c719">
				<div style="color: #06c719">
					<div class="info" v-if="calculatedPrices">
						<div class="person">
							<p v-for="(person, index) in calculatedPrices.person_name" :key="index">
								{{person}}
							</p>
						</div>
						<div class="price">
							<p v-for="(price, index) in calculatedPrices.price" :key="index">
								{{price}} руб
							</p>
						</div>
					</div>
					<div class="debtors" v-if="calculatedArrears">
						<div class="debtor">
							<p v-for="(debtor, index) in calculatedArrears.debtor_name" :key="index">
								{{debtor}}  переведи
							</p>
						</div>
						<div class="payer">
							<p v-for="(payer, index) in calculatedArrears.payer_name" :key="index">
								{{payer}}
							</p>
						</div>
						<div class="debt">
							<p v-for="(debt, index) in calculatedArrears.debt" :key="index">
								{{debt}} руб
							</p>
						</div>
					</div>
				</div>
			</div>
			<v-btn
					class="nav"
					type="button"
					@click="back()"
			>
				Назад
			</v-btn>
			<v-btn
					class="nav"
					type="button"
					@click="home()"
			>
				К началу
			</v-btn>
			<v-btn
					class="nav"
					type="button"
					@click="clean()"
			>
				Очистить
			</v-btn>
		</div>
	</div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {computed} from 'vue';
import {useStorePerson} from "@/stores/PersonStore"
import {useStoreMenu} from "@/stores/MenuStore"

const router = useRouter();

const storePerson = useStorePerson();
const storeMenu = useStoreMenu();

const calculatedPrices = computed(() => {
	const personPrice = storePerson.inputsPerson;
	const result = {price: [], person_name: []};

	for (let i = 0; i < storeMenu.inputsPrice.length; i++) {
		const infoProduct = storeMenu.inputsPrice[i];
		const price = infoProduct.price;
		const persons_length = infoProduct.personsId.length;

		for (let j = 0; j < infoProduct.personsId.length; j++) {
			const personId = infoProduct.personsId[j];
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
		const infoProduct = storeMenu.inputsPrice[i];
		const price = infoProduct.price;
		const persons_length = infoProduct.personsId.length;

		for (let j = 0; j < infoProduct.personsId.length; j++) {
			const personId = infoProduct.personsId[j];
			const payerId = infoProduct.payerId;
			const person = personPrice.find(item => item.id === personId);
			const payer = personPrice.find(item => item.id === payerId);
			const letters1 = ['а','я'];
			const letters2= ['й', 'ь'];
			if (payer.name !== person.name) {
				const ch  = payer.name.slice(-1).toLowerCase();
				if(letters1.includes(ch)) {
					result.payer_name.push(payer.name.slice(0, -1) + 'е');
				}
				else if(letters2.includes(ch)) {
					result.payer_name.push(payer.name.slice(0, -1) + 'ю');
				}
				else {
					result.payer_name.push(payer.name + 'у');
				}
				result.debtor_name.push(person.name);
				result.debt.push(Math.round(price / persons_length));
			}
		}
	}
	return result;
});

const back = () => {
	router.push('/menu');
};

const home = () => {
	router.push('/');
};

const clean = () => {
	localStorage.removeItem('piniaState');
	storePerson.inputsPerson = [];
	storeMenu.inputsPrice = [];
	router.push('/');
}
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
