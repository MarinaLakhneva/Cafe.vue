<template>
	<div class="main">
		<form id="menu">
			<button class="addMenu" type="button" @click="add()">
        <span class="add">
          <img class="plus" width="30" src="../assets/plus.svg">
          <p>Добавить позицию</p>
        </span>
			</button>
			<div class="input">
				<div class="inputMenu" v-for="(input, k) in inputsPrice" :key="k">
					<div class="setting">
						<button class="deleteMenu" type="button" @click="remove(k)" v-show="k || ( !k && inputsPrice.length >= 1)">-</button>
						<input
								type="text"
								:id="'product' + k"
								:name="'product' + k"
								v-model="input.product"
								placeholder="Название">
						<input
								type="number"
								:id="'price' + k"
								:name="'price' + k"
								v-model="input.price"
								placeholder="Цена">
						<button class="persons" type="button" @click="togglePersons(k)">+</button>
					</div>
					<div class="container" v-if="input.showPersons">
						<p style="color: #06c719">PERSON</p>
					</div>
				</div>
			</div>
			<div class="result">
				<p class="sum">Промежуточный итог :</p>
				<p style="font-size: 24px">1400 р</p>
			</div>
			<a class="back" href="/">Назад</a>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue';
const inputsPrice = ref([{ product: '', price: '', showPersons: false }]);
const add = () => {
	inputsPrice.value.push({ product: '', price: '', showPersons: false });
}
const remove = (index) => {
	inputsPrice.value.splice(index, 1);
}
const togglePersons = (index) => {
	inputsPrice.value[index].showPersons = !inputsPrice.value[index].showPersons;
	console.log()
}
</script>

<style scoped>
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
input{
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
	color: #06c719;
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
	max-height: 300px;
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
	color: #06c719;
}
.persons{
	border: none;
	background-color: #414141;
	font-size: 18px;
	color: #06c719;
}
.back{
	margin-top: 30px;
	padding: 5px 0;
	width: 100px;
	border-radius: 30px;
	border: 1px solid #7c7c7c;
	background-color: #5f5f5f;
	font-size: 18px;
	color: #06c719;
}
.container{
	margin-top: 20px;
	padding: 10px;
	width: 480px;
	border: 1px solid #7c7c7c;
	background-color: #5f5f5f;
}
.result{
	padding: 20px;
	width: 400px;
	border: 1px solid #7c7c7c;
	background-color: #5f5f5f;
	margin-top: 100px;
}
.sum{
	margin-bottom: 20px;
}
</style>
