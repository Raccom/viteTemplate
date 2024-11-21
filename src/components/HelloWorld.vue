<template>
    <div class="container">
        <div text-gray-500 p-15 class="content">
            <!-- pinia 获取状态 -->
            <p text-24px mb-10px md:text-30px>{{ username }} home</p>
            <div>
                <!-- ref 数据响应和传参 -->
                <button @click="content++" mr-5>count is {{ content }}</button>
                <button type="primary" @click="content = 99">change Value</button>
            </div>
        </div>
        <div m-15>
            <div>
                <maki:aerialway color="#000" text-18px />
            </div>
            <div v-for="item in icons">
                <!-- 动态图标渲染 -->
                <Icon :icon="item" text-18px></Icon>
            </div>
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
];
</script>

<style scoped lang="scss">
.content {
    background-color: $bgColor;
}
</style>
