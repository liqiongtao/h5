import { session } from '@/utils/cache'

export const state = {
    // 初始化状态
    status: false,

    // 授权令牌
    token: '',
    // 用户姓名
    username: '',
    // 权限
    permissions: []
}

export const getters = {
    isLogin(state) {
        if (state.token || session.get('__user_token__')) {
            return true
        }
        return false
    }
}

export const actions = {
    // 初始化
    init({ state }) {
        state.token = session.get('__user_token__') || ''
        state.username = session.get('__user_username__') || ''
        state.permissions = JSON.parse(session.get('__user_permissions__') || '[]')

        state.status = true
    }
}

export const mutations = {
    // 设置登录信息
    setLoginInfo(state, params) {
        state.token = params.token || ''
        state.username = params.username || ''
        state.permissions = params.permissions || []

        session.set('__login_token__', state.token)
        session.set('__user_username__', state.username)
        session.set('__user_permissions__', JSON.stringify(state.permissions))
    },
    // 清理登录信息
    clearLoginStatus(state) {
        state.token = ''
        state.username = ''
        state.permissions = []

        session.remove('__login_token__')
        session.remove('__user_username__')
        session.remove('__user_permissions__')
    }
}
