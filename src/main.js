import { createApp } from 'vue';
import { Ws } from '@/utils/socket.js';
import App from './App.vue';
import router from './router/index.js';
import { createPinia } from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import 'uno.css';
import "@/assets/css/index.scss";
import "element-plus/theme-chalk/src/message.scss";
import "element-plus/theme-chalk/src/message-box.scss";
import "element-plus/theme-chalk/src/loading.scss";
import "element-plus/theme-chalk/src/notification.scss";

const store = createPinia();
const app = createApp(App);
const socketInstance = new Ws();

app.config.globalProperties.$ws = socketInstance;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).use(store).mount('#app');
