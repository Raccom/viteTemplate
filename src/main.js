import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { createPinia } from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import "element-plus/theme-chalk/src/message.scss";
import "element-plus/theme-chalk/src/loading.scss";

const store = createPinia();
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).use(store).mount('#app');