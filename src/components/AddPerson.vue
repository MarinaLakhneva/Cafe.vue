<template>
	<div class="main">
		<form id="person">
			<button class="addPerson" type="button" @click="storePerson.add()">
        <span class="add">
          <img class="plus" width="30" src="../assets/plus.svg">
          <p>Добавить человека</p>
        </span>
			</button>
			<div class="input">
				<div class="inputPerson" v-for="(input, k) in storePerson.inputsPerson" :key="k">
					<button class="deletePerson" type="button" @click="storePerson.remove(k)" v-show="k || ( !k && storePerson.inputsPerson.length >= 1)">-</button>
					<input
							type="text"
							:id="'name' + k"
							:name="'name' + k"
							v-model="input.name"
							placeholder="имя">
				</div>
			</div>
			<button class="forth" type="button" @click="forth()">Далее</button>
		</form>
	</div>
</template>

<script setup>
	import {useStorePerson} from "../stores/PersonStore"
	const router = useRouter();
	import {useRouter} from "vue-router";
	const storePerson = useStorePerson();
	const persons = storePerson.inputsPerson;

	const forth = () => {
		if(persons.length !== 0){
			let j = 0;
			for (let i = 0; i < persons.length; i++) {
				if(persons[i].name === "") {
					j++;
				}
			}
			if(j === 0){
				router.push('/menu');
			}
		}
	};
</script>

<style scoped>
.main{
  display: flex;
	justify-content: center;
}
#person{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 500px;
	max-width: 100%;
}
input{
	padding: 10px;
	width: 200px;
	border-radius: 30px;
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
.addPerson{
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
.inputPerson{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 20px;
	padding-right: 10px;
	width: 260px;
}
.deletePerson{
	border: none;
	background-color: #414141;
	font-size: 18px;
	color: #06c719;
}
.forth{
	margin-top: 30px;
	padding: 5px 0;
	width: 100px;
	border-radius: 30px;
	border: 1px solid #7c7c7c;
	background-color: #5f5f5f;
	font-size: 18px;
	color: #06c719;
}
</style>
