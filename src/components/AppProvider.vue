<script setup>
const themeVars = reactive({
    buttonPrimaryBackground: '#334155',
    buttonPrimaryBorderColor: '#334155',
});
</script>

<template>
    <van-config-provider :theme-vars="themeVars">
        <slot></slot>
    </van-config-provider>
</template>
