<template>
    <ElConfigProvider :locale="zhCn" namespace="ep">
        <RouterView/>
    </ElConfigProvider>
</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
</script>

<style lang="scss">
</style>
