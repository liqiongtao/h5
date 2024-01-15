export const routes = [
    { path: '/:pathMatch(.*)', redirect: '/404' },
    {
        path: '/404',
        name: 'no-view',
        meta: { title: '404' },
        component: () => import('@/views/common/404.vue')
    },
    {
        path: '/401',
        name: 'no-access',
        meta: { title: '401' },
        component: () => import('@/views/common/401.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: { title: '登录', requireAuth: false },
        component: () => import('@/views/common/login.vue')
    },
    {
        path: '/',
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
                path: '',
                name: 'home',
                meta: { title: '首页' },
                component: () => import('@/views/home/home.vue')
            }
        ]
    }
]
