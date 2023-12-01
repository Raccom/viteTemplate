<script setup>
const props = defineProps({
    modelValue: Number,
});

const emit = defineEmits(['update:modelValue']);

const content = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});
</script>

<template>
    <van-button type="primary" @click="content=999">change Value</van-button>
</template>

<style scoped lang="scss"></style>
