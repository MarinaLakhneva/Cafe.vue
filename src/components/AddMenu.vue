<template>
	<div class="main">
		<form id="menu">
			<button class="addMenu" type="button" @click="storeMenu.add()">
        <span class="add">
          <img class="plus" width="30" src="../assets/plus.svg">
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
								v-model="menu.price"
								placeholder="Цена">
						<button class="showPerson" type="button" @click="storeMenu.togglePersons(menu.id)">+</button>
					</div>
					<div class="container" v-if="menu.showPerson">
						<div class="persons" v-for="person in storePerson.inputsPerson" :key=person.id>
							<input
									type="checkbox"
									:id="'name' + person.id"
									:name="'name' + person.id"
									:value=person.id
									v-model="menu.personsId"
							>
							<label>{{person.name}}</label>
						</div>
					</div>
				</div>
			</div>
			<div class="result">
				<p class="total">Промежуточный итог : {{resultPrice}}</p>
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

const resultPrice = computed(() => {
	let  sum = 0;
	storeMenu.inputsPrice.forEach(item => sum += item.price);
	return sum;
})

const back = () => {
	router.push('/');
};
const forth = () => {
	router.push('/result');
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
	max-height: 280px;
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
.showPerson{
	border: none;
	background-color: #414141;
	font-size: 18px;
}
.container{
	display: flex;
	flex-direction: column;
	margin-top: 20px;
	padding: 10px;
	width: 480px;
	border: 1px solid #7c7c7c;
	background-color: #5f5f5f;
	max-height: 60px;
	overflow-y: auto;
	div:not(:last-child) {
		margin-right: 10px;
	}
}
.persons{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	width: 100px;
	color: #06c719;
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
