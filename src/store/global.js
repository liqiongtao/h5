import { session } from '@/utils/cache'

export const state = {
    // 初始化状态
    status: false,

    // 授权令牌
    token: '',
    // 用户姓名
    username: ''
}

export const getters = {
    isLogin(state) {
        if (state.token || session.get('__token__')) {
            return true
        }
        return false
    }
}

export const actions = {
    // 初始化
    init({ state }) {
        state.token = session.get('__token__') || ''
        state.username = session.get('__username__') || ''

        state.status = true
    }
}

export const mutations = {
    // 设置登录信息
    setLoginInfo(state, params) {
        state.token = params.token || ''
        state.username = params.username || params.nickname || ''

        session.set('__token__', state.token)
        session.set('__username__', state.username)
    },
    // 清理登录信息
    clearLoginStatus(state) {
        state.token = ''
        state.username = ''

        session.remove('__token__')
        session.remove('__username__')
    }
}
