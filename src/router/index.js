import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import store from '@/store'
import { debug } from '@/utils/log'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to, form, next) => {
    debug('[route]', to)

    document.title = to.meta.title || import.meta.env.VITE_APP_SITE_TITLE || ''

    if (!store.state.status) {
        store.dispatch('init')
    }

    if (to.meta.requireAuth === false) {
        return next()
    }

    if (!store.getters['isLogin']) {
        return next({ name: 'login' })
    }

    return next()
})

export default router
