import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import viteCompression from 'vite-plugin-compression'

const pathResolve = (dir) => {
    return resolve(__dirname, ".", dir)
}

export default defineConfig({
    publicDir: "public",
    base: './',
    //静态资源处理
    assetsInclude: "",
    //控制台输出的级别 info 、warn、error、silent
    logLevel: "info",
    // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
    clearScreen: true,
    resolve: {
        // https://vitejs.dev/config/#resolve-alias
        alias: {
            '@': pathResolve("src")
        },
        extensions: ['', '.js', '.json', '.vue', '.scss', '.css']
    },
    esbuild: {
        jsxFactory: "h",
        jsxFragment: "Fragment",
        jsxInject: `import Vue from 'vue'`
    },
    //本地运行配置，以及反向代理配置
    server: {
        host: "localhost", // 0.0.0.0
        https: false, //是否启用 https
        cors: true, //为开发服务器配置 CORS , 默认启用并允许任何源
        open: false, //服务启动时自动在浏览器中打开应用
        port: 5173,
        strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
        hmr: false, //禁用或配置 HMR 连接
        // 传递给 chockidar 的文件系统监视器选项
        watch: {
            ignored: ["!**/node_modules/your-package-name/**"]
        },
        // 反向代理配置
        proxy: {
            '/api': {
                target: "http://localhost:8080",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    //打包配置
    build: {
        //浏览器兼容性  "esnext"|"modules"
        target: "modules",
        //指定输出路径
        outDir: "dist",
        //生成静态资源的存放路径
        assetsDir: "assets",
        //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
        assetsInlineLimit: 4096,
        //启用/禁用 CSS 代码拆分
        cssCodeSplit: true,
        //构建后是否生成 source map 文件
        sourcemap: false,
        //自定义底层的 Rollup 打包配置
        rollupOptions: {},
        //@rollup/plugin-commonjs 插件的选项
        commonjsOptions: {},
        //构建的库
        //当设置为 true，构建后将会生成 manifest.json 文件
        manifest: false,
        // 设置为 false 可以禁用最小化混淆，
        // 或是用来指定使用哪种混淆器
        // boolean | 'terser' | 'esbuild'
        minify: "terser", //terser 构建后文件体积更小
        //传递给 Terser 的更多 minify 选项。
        terserOptions: {},
        //设置为 false 来禁用将构建后的文件写入磁盘
        write: true,
        //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
        emptyOutDir: true,
        //chunk 大小警告的限制
        chunkSizeWarningLimit: 500
    },
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue'],
            resolvers: [
                ElementPlusResolver(), // Auto import icon components
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon'
                })
            ],
            dts: pathResolve('src/auto-imports.d.ts')
        }),
        Components({
            resolvers: [
                IconsResolver({
                    enabledCollections: ['ep']
                }),
                ElementPlusResolver()
            ],
            dts: pathResolve('src/components.d.ts')
        }),
        Icons({
            compiler: 'vue3',
            autoInstall: true
        }),
        // terser()
        viteCompression({
            threshold: 1000 * 100 // 对大于 100kb 的文件进行压缩
        })
    ],
})