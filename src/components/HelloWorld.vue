<template>
    <div class="container">
            <div text-gray-500 m-15 class="content">
                <!-- pinia 获取状态 -->
                <p text-36px mb-10px font-size-100px>{{ username }} home</p>
                <div>
                    <!-- ref 数据响应和传参 -->
                    <van-button @click="content++" mr-5>count is {{ content }}</van-button>
                    <van-button type="primary" @click="content=99">change Value</van-button>
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
                        <maki:aerialway color="#000" text-30px />
                    </template>
                </van-button>
                <van-button circle v-for="item in icons">
                    <template #icon>
                        <!-- 动态图标渲染 -->
                        <Icon :icon="item" text-30px></Icon>
                    </template>
                </van-button>
            </div>
        </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { Icon } from "@iconify/vue";
import { useUserStore } from '@/store/useUserStore';

const userStore = useUserStore();
const { username } = storeToRefs(userStore);

const props = defineProps({
    modelValue: Number,
});

const emit = defineEmits(['update:modelValue']);

const content = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});

const icons = [
    'ph:address-book',
    'ph:air-traffic-control-light'
]
</script>

<style scoped lang="scss">
.content {
    background-color: $bgColor;
}
</style>
