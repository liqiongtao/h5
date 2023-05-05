import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import postcssPxToViewport from 'postcss-px-to-viewport'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig({
    base: './',
    plugins: [
        vue(),
        vueJsx(),
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
        outDir: 'dist',
        sourcemap: false,
        emptyOutDir: true
    },
    server: {
        open: true
    }
})
