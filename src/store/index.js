import { createStore } from 'vuex'
import { state, getters, actions, mutations } from './global'
import { debug } from '@/utils/log'

const files = import.meta.globEager('@/views/**/*.module.js')

const modules = {}
Object.keys(files).forEach((key) => {
    const module = files[key].default
    const moduleName = key.replace(/\/src\/views\/(.*)\/(.*).module.js/, '$2')
    if (!module) {
        debug('模块加载失败', key, module, moduleName)
        return
    }
    modules[moduleName] = module
})

export default createStore({
    state,
    getters,
    actions,
    mutations,
    modules
})
