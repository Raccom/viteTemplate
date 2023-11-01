<template>
    <ElConfigProvider :locale="zhCn">
        <RouterView/>
    </ElConfigProvider>
</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
</script>

<style lang="scss">
@use '@/assets/css/index';
</style>