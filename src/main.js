import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Ws } from '@/utils/socket.js';
import App from './App.vue';
import router from './router/index.js';

import 'uno.css';
import 'vfonts/FiraCode.css';
import "@/assets/css/index.scss";

const store = createPinia();
const app = createApp(App);
const socketInstance = new Ws();

app.config.globalProperties.$ws = socketInstance;

app.use(router).use(store).mount('#app');
