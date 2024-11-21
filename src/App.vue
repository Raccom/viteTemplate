<template>
    <ElConfigProvider :locale="zhCn" namespace="ep">
        <RouterView v-slot="{ Component, route }">
            <transition name="fade" mode="out-in" @enter="onEnter">
                <component :is="Component" :key="route.path" />
            </transition>
        </RouterView>
    </ElConfigProvider>
</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const onEnter = (el, done) => {
    done()
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity .15s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
