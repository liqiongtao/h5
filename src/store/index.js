import { createStore } from 'vuex'
import { state, getters, actions, mutations } from './global'

const files = import.meta.globEager('@/views/**/*.module.js')

const modules = {}
Object.keys(files).forEach((key) => {
    const module = files[key].default
    const moduleName = key.replace(/\/src\/views\/(.*)\/(.*).module.js/, '$1')
    modules[moduleName] = module
})

export default createStore({
    state, getters, actions, mutations, modules
})
