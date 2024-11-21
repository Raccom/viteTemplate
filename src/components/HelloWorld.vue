<template>
    <div class="container">
        <div text-gray-500 m-15 class="content">
            <!-- pinia 获取状态 -->
            <p text-24px mb-10px md:text-30px>{{ username }} home</p>
            <div>
                <!-- ref 数据响应和传参 -->
                <el-button @click="content++" mr-5>count is {{ content }}</el-button>
                <el-button type="primary" @click="content = 99">change Value</el-button>
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
                    <el-icon color="#000" text-18px>
                        <Plus />
                    </el-icon>
                </template>
            </el-button>
            <el-button circle v-for="item in icons">
                <component :is="item" w18px h18px></component>
            </el-button>
        </el-container>
        <el-divider />
        <el-container m-15>
            <!-- echart图表渲染 -->
            <div ref="viewMountChart" h350px w480px mr20px mt30px></div>
        </el-container>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { UserFilled, StarFilled } from "@element-plus/icons-vue";
import { useUserStore } from '@/store/useUserStore';
import { useEcharts } from "@/hooks/useECharts";

const userStore = useUserStore();
const { username } = storeToRefs(userStore);

const props = defineProps({
    modelValue: Number,
});

const emit = defineEmits(['update:modelValue']);

const content = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});

const icons = [
    UserFilled,
    StarFilled
];

const viewMountChart = ref(null);

const pieOptions = {
    title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

const { updateOptions: updatePieOptions } = useEcharts(viewMountChart, pieOptions);
</script>

<style scoped lang="scss">
.content {
    background-color: $bgColor;
}
</style>
