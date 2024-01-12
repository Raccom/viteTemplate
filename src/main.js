import { createApp } from 'vue';
import { createPinia } from 'pinia';
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

app.use(router).use(store).mount('#app');
