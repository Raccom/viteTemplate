<template>
    <HelloWorld></HelloWorld>
    <div>
        home
        {{ username }}
        {{ num }}
    </div>
    <el-button @click="num++" type="primary">
        <el-icon><Plus /></el-icon>
    </el-button>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from '@/store';
import HelloWorld from '../../components/helloWorld.vue';

const store = useStore();
const { username } = storeToRefs(store);

const num = ref(0);
</script>

<style lang="scss" scoped>
</style>