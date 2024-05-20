<template>
  <div class="main">
    <div id="result">
      <p class="title">Счет</p>
      <div class="persons" style="color: #06c719" v-for="infoProduct in storeMenu.inputsPrice" :key=infoProduct.id>
        <div class="persons" style="color: #06c719" v-for="(personId, index) in infoProduct.personsId" :key=index>
          {{prices(personId, infoProduct.price, infoProduct.personsId)}}
        </div>
      </div>
      <div style="color: #06c719">{{res}}</div>
      <button class="nav" type="button" @click="back()">Назад</button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const router = useRouter();
import {useRouter} from "vue-router";

import {useStorePerson} from "../stores/PersonStore"
import {useStoreMenu} from "../stores/MenuStore"
import {computed} from "@vue/reactivity";

const storePerson = useStorePerson();
const storeMenu = useStoreMenu();

const res = ref({ person: [], price: [] });


const prices = (id, price, persons) => {
	const personPrice = storePerson.inputsPerson;
	const obj = personPrice.find(item => item.id === id);
	const n = persons.length;

	const index = res.value.person.findIndex(val => val === obj.name);
	if (index !== -1) {
		computed(() => {
      console.log(res.value.price[index])
			console.log(price/n)
			res.value.price[index] += price / n;
			console.log(res.value.price[index])
		})
	} else {
		res.value.person.push(obj.name);
		res.value.price.push(price / n);
	}
};

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
