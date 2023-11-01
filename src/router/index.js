import {createRouter, createWebHistory} from 'vue-router';
import {ElLoading} from 'element-plus';
import Home from '@/pages/home';

const routes = [
    {
        path: '/',
        redirect: 'home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/:error*', // /:error -> 匹配 /, /one, /one/two, /one/two/three, 等
        name: '404',
        component: Home
    }
]

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const loadingInstance = ElLoading.service({text: '加载中...'});

    // login code
    setTimeout(() => {
        loadingInstance.close();
        next();
    }, 800)
})

// 导出路由
export default router
