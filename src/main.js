import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'
import { createPinia } from 'pinia';
import { ElLoading } from 'element-plus';
import 'element-plus/es/components/loading/style/css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const store = createPinia();
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$ElLoading = ElLoading.service({
    text: '加载中...'
});

app.use(router).use(store).mount('#app');