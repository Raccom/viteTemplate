<template>
    <div class="container">
        <div text-gray-500 m-15 class="content">
            <!-- pinia 获取状态 -->
            <p text-24px mb-10px md:text-30px>{{ username }} home</p>
            <div>
                <!-- ref 数据响应和传参 -->
                <n-button @click="content++" mr-5>count is {{ content }}</n-button>
                <n-button type="primary" @click="content=99">change Value</n-button>
            </div>
        </div>
        <n-divider />
        <n-space m-15>
            <!-- naive 组件主题展示 -->
            <n-button>default</n-button>
            <n-button type="tertiary"> Tertiary </n-button>
            <n-button type="primary"> Primary </n-button>
            <n-button type="info"> Info </n-button>
            <n-button type="success"> Success </n-button>
            <n-button type="warning"> Warning </n-button>
            <n-button type="error"> Error </n-button>
        </n-space>
        <n-divider />
        <n-space m-15>
            <n-button circle>
                <template #icon>
                    <!-- 直接使用 icon -->
                    <maki:aerialway color="#000" text-18px />
                </template>
            </n-button>
            <n-button circle v-for="item in icons">
                <template #icon>
                    <!-- 动态图标渲染 -->
                    <Icon :icon="item" text-18px></Icon>
                </template>
            </n-button>
        </n-space>
        <n-divider />
        <n-space m-15>
            <!-- echart图表渲染 -->
            <div ref="viewMountChart" h350px w480px mr20px mt30px></div>
        </n-space>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { Icon } from "@iconify/vue";
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
    'ph:address-book',
    'ph:air-traffic-control-light'
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
