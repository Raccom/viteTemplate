import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/pages/Home/Home'

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

// 导出路由
export default router
