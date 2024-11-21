<script setup>
import { NConfigProvider, darkTheme, zhCN, dateZhCN, useLoadingBar, useDialog, useMessage, useNotification } from 'naive-ui';

/**
 * @type import('naive-ui').GlobalThemeOverrides
 */
const lightThemeOverrides = {
    common: {
        primaryColor: '#3c61ea',
        primaryColorHover: '#3a45ea',
        primaryColorPressed: '#0a1758',
        primaryColorSuppl: '#3d61ea',
        fontWeightStrong: '600'
    },
};

const darkThemeOverrides = {
    common: {
        primaryColor: '#00baff',
        primaryColorHover: '#00a6ff',
        primaryColorPressed: '#0095ff',
        primaryColorSuppl: '#006fff',
        fontWeightStrong: '600'
    }
};

/*
    // use dark theme
    const theme = darkTheme;
*/
const theme = null;

// 挂载naive组件的方法至window, 以便在全局使用
const setupNaiveTools = () => {
    window.$loadingBar = useLoadingBar()
    window.$dialog = useDialog()
    window.$message = useMessage()
    window.$notification = useNotification()
}

const NaiveProviderContent = defineComponent({
    setup () {
        setupNaiveTools()
    },
    render () {
        return h('div')
    },
})
</script>

<template>
    <n-config-provider
        :theme="theme"
        :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides"
        :locale="zhCN"
        :date-locale="dateZhCN"
    >
        <n-loading-bar-provider>
            <n-dialog-provider>
                <n-notification-provider>
                    <n-message-provider>
                        <slot></slot>
                        <NaiveProviderContent />
                    </n-message-provider>
                </n-notification-provider>
            </n-dialog-provider>
        </n-loading-bar-provider>
    </n-config-provider>
</template>

