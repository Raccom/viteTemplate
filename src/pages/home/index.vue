<template>
    <div text-gray-500 m-15 class="content">
        <!-- pinia 获取状态 -->
        <p text-24px mb-10px>{{ username }} home</p>
        <div>
            <!-- ref 数据响应和传参 -->
            <el-button @click="num++" mr-5>count is {{ num }}</el-button>
            <HelloWorld v-model="num"></HelloWorld>
        </div>
    </div>
    <el-divider />
    <el-container m-15>
        <!-- naive 组件主题展示 -->
        <el-button>default</el-button>
        <el-button type="primary"> Primary </el-button>
        <el-button type="info"> Info </el-button>
        <el-button type="success"> Success </el-button>
        <el-button type="warning"> Warning </el-button>
        <el-button type="danger"> Error </el-button>
    </el-container>
    <el-divider />
    <el-container m-15>
        <el-button circle>
            <template #icon>
                <!-- 直接使用 icon -->
                <el-icon color="#000" text-18px md:text-24px><Plus/></el-icon>
            </template>
        </el-button>
        <el-button circle v-for="item in icons">
            <component :is="item" w18px h18px></component>
        </el-button>
    </el-container>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/useUserStore';
import { UserFilled, StarFilled } from "@element-plus/icons-vue";

const userStore = useUserStore();
const { username } = storeToRefs(userStore);

const num = ref(0);

const icons = [
    UserFilled,
    StarFilled
]
</script>

<style lang="scss" scoped>
.content {
    background-color: $bgColor;
}
</style>
