<template>
    <AppProvider>
        <RouterView v-slot="{ Component, route }">
            <transition name="fade" mode="out-in" @enter="onEnter">
                <component :is="Component" :key="route.path" />
            </transition>
        </RouterView>
    </AppProvider>
</template>

<script setup>
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
