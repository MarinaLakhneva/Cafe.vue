<template>
	<div class="main">
		<form id="menu">
			<button class="addMenu" type="button" @click="storeMenu.add()">
        <span class="add">
          <img class="plus" width="30" src="../assets/plus.svg" alt="plus">
          <p>Добавить позицию</p>
        </span>
			</button>
			<div class="input">
				<div class="inputMenu" v-for="(menu) in storeMenu.inputsPrice" :key=menu.id>
					<div class="setting">
						<button class="deleteMenu" type="button" @click="storeMenu.remove(menu.id)">-</button>
						<input
								class="info"
								type="text"
								:id="'product' + menu.id"
								:name="'product' + menu.id"
								v-model="menu.product"
								placeholder="Название">
						<input
								class="info"
								type="number"
								:id="'price' + menu.id"
								:name="'price' + menu.id"
								min="0"
								v-model="menu.price"
								placeholder="Цена">
						<button class="showPersons" type="button" @click="storeMenu.togglePersons(menu.id)">
							<img class="settings" width="20" src="../assets/settings.png" alt="settings">
						</button>
					</div>
					<div class="container" v-if="menu.showPersons">
						<div class="personsEat">
							<div class="persons" v-for="person in storePerson.inputsPerson" :key=person.id>
								<input
										type="checkbox"
										:id="'person' + person.id"
										:name="'person' + person.id"
										:value="person.id"
										v-model="menu.personsId"
								>
								<label>{{person.name}}</label>
							</div>
						</div>
						<div class="payer">
							<button class="showPayers" type="button" @click="storeMenu.togglePayer(menu.id)">Платит</button>
							<div class="personsPay" v-if="menu.showPayer">
								<div class="persons" v-for="payer in storePerson.inputsPerson" :key=payer.id>
									<input
											type="radio"
											:id="'payer' + menu.id"
											:name="'payer' + menu.id"
											:value="payer.id"
											v-model="menu.payerId"
									>
									<label>{{payer.name}}</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="result">
				<p class="total">Промежуточный итог : {{resultPrice}} руб</p>
			</div>
			<div class="buttons">
				<button class="nav" type="button" @click="back()">Назад</button>
				<button class="nav" type="button" @click="forth()">Далее</button>
			</div>
		</form>
	</div>
</template>

<script setup>
const router = useRouter();
import {useRouter} from "vue-router";
import {computed} from "@vue/reactivity";

import {useStorePerson} from "../stores/PersonStore"
import {useStoreMenu} from "../stores/MenuStore"

const storePerson = useStorePerson();
const storeMenu = useStoreMenu();
const menu = storeMenu.inputsPrice;

const resultPrice = computed(() => {
	let  sum = 0;
	storeMenu.inputsPrice.forEach(item => sum += Number(item.price));
	return sum;
})

const back = () => {
	router.push('/');
};
const forth = () => {
	if(menu.length !== 0){
		let j = 0;
		for (let i = 0; i < menu.length; i++) {
			if(menu[i].product === "" || menu[i].price === "" || menu[i].payerId === "" || menu[i].personsId === "") {
				j++;
			}
		}
		if(j === 0){
			router.push('/result');
		}
	}
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
#menu{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 500px;
	max-width: 100%;
}
.info{
	padding: 10px;
	width: 200px;
	border: 1px solid #7c7c7c;
	background-color: #5f5f5f;
	font-size: 16px;
	color: #ffffff;
}
form{
	display: flex;
	flex-direction: column;
	padding: 20px 50px;
	border-radius: 30px;
	background-color: #414141;
}
.addMenu{
	width: 250px;
	border-radius: 30px;
	border: 1px solid #7c7c7c;
	background-color: #5f5f5f;
	font-size: 18px;
}
.plus{
	margin-right: 10px;
}
.add{
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px;
}
.input{
	max-height: 400px;
	overflow-y: auto;
}
.setting{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 20px;
	padding-right: 10px;
	width: 500px;
}
.deleteMenu{
	border: none;
	background-color: #414141;
	font-size: 18px;
}
.showPersons{
	border: none;
	background-color: #414141;
	font-size: 18px;
}
.container{
	display: flex;
	flex-direction: row;
	margin-top: 20px;
	padding: 10px;
	width: 480px;
	border: 1px solid #7c7c7c;
	background-color: #5f5f5f;
	max-height: 100px;
	overflow-y: auto;
}
.personsEat{
	display: flex;
	flex-direction: column;
}
.persons{
	display: flex;
	justify-content: flex-start;
	width: 150px;
	color: #06c719;
}
.payer{
	display: flex;
}
.showPayers{
	cursor: pointer;
	margin-left: 50px;
	padding: 10px;
	border-radius: 10px;
	border: 1px solid #7c7c7c;
	color: #ffffff;
	background-color: #06c719;
}
.showPayers:hover {
	color: #06c719;
	background-color: #5f5f5f;
}
.personsPay{
	margin-left: 20px;
}
.result{
	margin-top: 50px;
	padding: 20px;
	width: 400px;
	border: 1px solid #7c7c7c;
	background-color: #5f5f5f;
}
.total{
	font-size: 22px;
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
.buttons{
	display: flex;
	justify-content: space-between;
	width: 250px;
}
</style>
