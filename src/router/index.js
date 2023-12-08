import {createRouter, createWebHistory} from 'vue-router';
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
        path: '/:error*', // /:error -> 匹配其他错误路径
        name: '404',
        component: Home
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // login code
    next();
});

export default router;
