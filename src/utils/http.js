import axios from 'axios'
import store from '@/store'
import { md5, sha1 } from '@/utils/crypto'
import { debug } from '@/utils/log'

var instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Request-Source': 'web??'
    },
    responseType: 'json',
    timeout: 30000
})

instance.interceptors.request.use(
    http => {
        if (store.getters['login/token']) {
            http.headers.Authorization = store.getters['login/token']
        }

        const ts = parseInt((new Date()).getTime() / 1000)

        http.headers['X-Request-Sign'] = sha1(ts + md5(navigator.userAgent || ''))
        http.headers['X-Request-Timestamp'] = ts

        return http
    },
    error => {
        return Promise.reject(error)
    }
)

const messages = {
    401: { title: '警告', message: '未授权访问' },
    403: { title: '警告', message: '没有权限访问接口' },
    404: { title: '警告', message: '请求接口不存在' },
    500: { title: '警告', message: '服务器暂停访问，请联系管理员！' }
}

instance.interceptors.response.use(
    res => {
        const code = ((res || {}).data || {}).code
        messages[code] && debug(messages[code])
        if (code == 401) {
            store.commit('login/clear')
            window.location.reload()
        }
        return res
    },
    error => {
        if (typeof error == 'string') {
            if (String(error).indexOf('Network Error') !== -1) {
                debug(messages[500])
            } else {
                debug(error)
            }
            return Promise.reject(error)
        }

        const status = ((error || {}).response || {}).status
        const code = (((error || {}).response || {}).data || {}).code
        if (messages[status] || messages[code]) {
            debug(messages[status] || messages[code])
        }
        if ((status || code) == 401) {
            store.commit('login/clear')
            window.location.reload()
        }
        return Promise.reject(error)
    }
)

export function get(uri) {
    return instance.get(uri).then(res => {
        var rst = (res || {}).data || {}
        debug(`[GET] uri=${uri}`, 'result=', rst)
        return Promise.resolve(rst)
    })
}

export function post(uri, params) {
    return instance.post(uri, params || {}).then(res => {
        var rst = res.data || {}
        debug(`[POST] uri=${uri}`, `params=${JSON.stringify(params)}`, 'result=', rst)
        return Promise.resolve(rst)
    })
}
