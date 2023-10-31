<template>
    <ElConfigProvider>
        <RouterView/>
    </ElConfigProvider>
</template>

<script setup>
import {reactive, getCurrentInstance} from 'vue';

const {proxy} = getCurrentInstance();

setTimeout(() => {
    proxy.$ElLoading.close();
}, 500)
</script>

<style lang="scss">
@import '@/assets/css/index';
</style>