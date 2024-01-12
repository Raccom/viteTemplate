import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.js';

import 'uno.css';
import 'vfonts/FiraCode.css';
import "@/assets/css/index.scss";

const store = createPinia();
const app = createApp(App);

app.use(router).use(store).mount('#app');
