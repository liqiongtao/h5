import { createStore } from 'vuex'
import { state, getters, actions, mutations } from './global'

const files = import.meta.glob('@/views/*.module.js')

let modules = Object.keys(files).reduce((modules, modulePath) => {
    const path = modulePath.substr(modulePath.lastIndexOf('/'))
    const moduleName = path.replace(/^\/(.*)\.\w+$/, '$1').split('.')[0]
    const value = files(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

export default createStore({
    state, getters, actions, mutations, modules
})
