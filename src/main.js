import {createApp, watch} from 'vue'
import App from './App.vue'
import routes from "./routes";
import { createPinia } from 'pinia'
import {createVuetify} from 'vuetify';


const app = createApp(App);
app.use(routes);

//warning v-btn не уходит
const vuetify = createVuetify();
app.use(vuetify);

const pinia = createPinia();
app.use(pinia);

app.mount('#app');

const savedState = localStorage.getItem('piniaState');
if (savedState) {
    pinia.state.value = JSON.parse(savedState);
}

watch(
    pinia.state,
    (state) => {
        localStorage.setItem('piniaState', JSON.stringify(state));
    },
    { deep: true }
);