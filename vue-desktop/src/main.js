import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import goveeClientPlugin from './plugins/goveeClientPlugin.js';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(goveeClientPlugin, {
    apiKey: '492bc24d-a091-45a2-ac1d-08c54ce97570',
})
app.mount('#app');
