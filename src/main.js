import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Ws } from '@/utils/socket.js';
import App from './App.vue';
import router from './router/index.js';

import "@/assets/css/index.scss";
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';
import 'uno.css';

const store = createPinia();
const app = createApp(App);
const socketInstance = new Ws();

app.config.globalProperties.$ws = socketInstance;

app.use(router).use(store).mount('#app');
