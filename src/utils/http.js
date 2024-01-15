import axios from 'axios'
import store from '@/store'
import { md5, sha1, encrypt, decrypt } from '@/utils/crypto'
import { debug } from '@/utils/log'

var instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json',
    timeout: 30000
})

instance.interceptors.request.use(
    (http) => {
        http.headers = Object.assign({}, http.headers, getHeaders())
        return http
    },
    (error) => {
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
    (res) => {
        const code = ((res || {}).data || {}).code
        messages[code] && debug(messages[code])
        if (code == 401) {
            store.commit('clearLoginStatus')
            window.location.reload()
        }
        return res
    },
    (error) => {
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
            store.commit('clearLoginStatus')
            window.location.reload()
        }
        return Promise.reject(error)
    }
)

export function getHeaders() {
    const ts = parseInt(new Date().getTime() / 1000)

    const headers = {
        'X-Request-AppId': md5(import.meta.env.VITE_APP_KEY),
        'X-Request-Sign': sha1(ts + md5(navigator.userAgent || '')),
        'X-Request-Timestamp': ts
    }

    if (store.state.token) {
        headers.Authorization = store.state.token
    }

    return headers
}

export async function get(uri) {
    const res = await instance.get(uri)
    var rst = (res || {}).data || {}
    debug(`[GET] uri=${uri}`, 'result=', rst)
    return await Promise.resolve(rst)
}

export async function post(uri, params) {
    const res = await instance.post(uri, encrypt(params || {}))
    var rst = res.data || {}
    if (rst.data) {
        rst.data = JSON.parse(decrypt(rst.data) || '{}') || {}
    }
    debug(`[POST] uri=${uri}`, `params=${JSON.stringify(params)}`, 'result=', rst)
    return await Promise.resolve(rst)
}

export async function download(uri, params = {}, fileType = '') {
    const res = await instance.post(uri, encrypt(params || {}), { responseType: 'blob' })

    const blob = new Blob([res.data], { type: fileType })
    const link = document.createElement('a')

    link.download = decodeURIComponent((res.headers['content-disposition'] || '').split('filename=')[1] || '')
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)

    document.body.appendChild(link)

    link.click()

    URL.revokeObjectURL(link.href)
    document.body.removeChild(link)

    debug(`[Download] uri=${uri}`, `params=${JSON.stringify(params)}`, link.download)

    return await Promise.resolve({ code: 0, message: 'ok' })
}

export async function downloadExcel(uri, params = {}) {
    return await download(uri, params, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8')
}
