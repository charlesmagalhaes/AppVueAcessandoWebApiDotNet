import { createApp } from 'vue';
import App from './App.vue';
import store from './store/Store';
import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:44395/api';


const app = createApp(App);

app.use(store);

app.mount('#app');


