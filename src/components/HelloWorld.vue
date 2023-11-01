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
    <h1>hello</h1>
    <el-button type="primary" @click="content=999">change Value</el-button>
</template>

<style scoped lang="scss"></style>