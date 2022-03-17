import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue3 from 'bootstrap-vue-3';

const app = createApp(App);
app.use(VueAxios, axios, BootstrapVue3 );
app.mount('#app');
