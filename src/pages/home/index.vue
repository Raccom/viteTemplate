<template>
    <div text-gray-500 m-15>
        <!-- pinia 获取状态 -->
        <p text-36px mb-10px font-size-100px>{{ username }} home</p>
        <div>
            <!-- ref 数据响应和传参 -->
            <van-button @click="num++" mr-5>count is {{ num }}</van-button>
            <HelloWorld v-model="num"></HelloWorld>
        </div>
    </div>
    <van-divider />
    <div m-15>
        <!-- naive 组件主题展示 -->
        <van-button>default</van-button>
        <van-button type="primary"> Primary </van-button>
        <van-button type="success"> Success </van-button>
        <van-button type="warning"> Warning </van-button>
        <van-button type="danger"> Error </van-button>
    </div>
    <van-divider />
    <div m-15>
        <van-button circle>
            <template #icon>
                <!-- 直接使用 icon -->
                <icon-maki:aerialway color="#000" text-30px />
            </template>
        </van-button>
        <van-button circle v-for="item in icons">
            <template #icon>
                <!-- 动态图标渲染 -->
                <Icon :icon="item" text-30px></Icon>
            </template>
        </van-button>
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
</style>
