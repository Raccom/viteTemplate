<template>
    <div text-gray-500 m-15>
        <p text-24px mb-10px>{{ username }} home</p>
        <div>
            <n-button @click="num++" mr-5>count is {{ num }}</n-button>
            <HelloWorld v-model="num"></HelloWorld>
        </div>
    </div>
    <n-divider />
    <n-space m-15>
        <n-button><icon-maki:aerialway color="#000" style="font-size: 18px;" /></n-button>
        <n-button type="tertiary"> Tertiary </n-button>
        <n-button type="primary"> Primary </n-button>
        <n-button type="info"> Info </n-button>
        <n-button type="success"> Success </n-button>
        <n-button type="warning"> Warning </n-button>
        <n-button type="error"> Error </n-button>
    </n-space>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from '@/store';

const store = useStore();
const { username } = storeToRefs(store);

const num = ref(0);
</script>

<style lang="scss" scoped></style>