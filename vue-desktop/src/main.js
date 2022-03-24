import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import goveeClientPlugin from './plugins/goveeClientPlugin.js';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(goveeClientPlugin, {
    apiKey: process.env.API_KEY,
})
app.mount('#app');
