import { fileURLToPath, URL } from 'url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import postcssPxToViewport from 'postcss-px-to-viewport'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vueSetupExend from 'vite-plugin-vue-setup-extend'
import { VantResolver } from 'unplugin-vue-components/resolvers'

const ts = new Date().getTime()

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    return defineConfig({
        base: env.VITE_BASE_URL,
        plugins: [
            vue(),
            vueJsx(),
            vueSetupExend(),
            AutoImport({
                resolvers: [VantResolver()],
                imports: ['vue', 'vue-router', 'vuex', '@vueuse/head'],
                dts: './auto-import.d.ts',
                eslintrc: {
                    enabled: false,
                    globalsPropValue: true,
                    filepath: './.eslintrc-auto-import.json'
                }
            }),
            Components({
                resolvers: [VantResolver()]
            })
        ],
        resolve: {
            extensions: ['.js', '.vue', '.json', '.ts', '.mjs', '.cjs'],
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        css: {
            postcss: {
                plugins: [
                    postcssPxToViewport({
                        viewportWidth: 375,
                        unitPrecision: 5,
                        exclude: [/node_modules/, /public/]
                    })
                ]
            }
        },
        build: {
            target: ['es2015'],
            outDir: 'dist',
            manifest: true,
            sourcemap: false,
            emptyOutDir: true,
            rollupOptions: {
                output: {
                    chunkFileNames: `static/js/[name]-${ts}.js`,
                    entryFileNames: `static/js/[name]-${ts}.js`,
                    assetFileNames: `static/[ext]/[name]-${ts}.[ext]`,
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString()
                        }
                    }
                }
            }
        },
        server: {
            open: true,
            port: 9091,
            hmr: { overlay: false }
        }
    })
}
