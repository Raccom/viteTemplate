<template>
    <div text-gray-500 p-15 class="content">
        <!-- pinia 获取状态 -->
        <p text-24px mb-10px>{{ username }} home</p>
        <div>
            <!-- ref 数据响应和传参 -->
            <button @click="num++" mr-5>count is {{ num }}</button>
            <HelloWorld v-model="num"></HelloWorld>
        </div>
    </div>
    <div m-15>
        <div>
            <icon-maki:aerialway color="#000" text-18px />
        </div>
        <div v-for="item in icons">
            <!-- 动态图标渲染 -->
            <Icon :icon="item" text-18px md:text-24px></Icon>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { Icon } from "@iconify/vue";
import { useUserStore } from '@/store/useUserStore';

const userStore = useUserStore();
const { username } = storeToRefs(userStore);

const num = ref(0);

const icons = [
    'ph:address-book',
    'ph:air-traffic-control-light'
]
</script>

<style lang="scss" scoped>
.content {
    background-color: $bgColor;
}
</style>
