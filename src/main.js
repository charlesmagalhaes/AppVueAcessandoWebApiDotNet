import { createApp } from 'vue';
import App from './App.vue';
import store from './store/Store';
import axios from 'axios';
import routes from './router/routes';

axios.defaults.baseURL = 'https://localhost:44395/api';


const app = createApp(App);

app.use(routes)
app.use(store);

app.mount('#app');


