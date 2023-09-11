<template>
    <ElConfigProvider :size="state.size" :z-index="state.zIndex">
        <RouterView/>
    </ElConfigProvider>
</template>

<script setup>
import {reactive, getCurrentInstance} from 'vue';

const {proxy} = getCurrentInstance()

const state = reactive({
    zIndex: 3000,
    size: 'small'
});


setTimeout(() => {
    proxy.$ElLoading.close()
}, 500)
</script>

<style lang="scss">

</style>