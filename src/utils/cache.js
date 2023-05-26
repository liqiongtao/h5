import { md5, base64encode, base64decode } from '@/utils/crypto'
import Cookies from 'js-cookie'

function encodeKey(key) {
    return md5(window.location.host + import.meta.env.VITE_APP_SOURCE + import.meta.env.VITE_APP_KEY + key)
}

export const cookie = {
    set(key, val) {
        Cookies.set(key, val)
    },
    get(key) {
        var val = Cookies.get(key) || ''
        return val ? val : ''
    },
    remove(key) {
        return Cookies.remove(key)
    }
}

export const session = {
    set(key, val) {
        sessionStorage.setItem(encodeKey(key), base64encode(val))
    },
    get(key) {
        if (key == 'debug') return sessionStorage.getItem(key) || ''
        var val = sessionStorage.getItem(encodeKey(key)) || ''
        return val ? base64decode(val) : ''
    },
    remove(key) {
        sessionStorage.removeItem(encodeKey(key))
    }
}

export const local = {
    set(key, val) {
        localStorage.setItem(encodeKey(key), base64encode(val))
    },
    get(key) {
        if (key == 'debug') return localStorage.getItem(key) || ''
        var val = localStorage.getItem(encodeKey(key)) || ''
        return val ? base64decode(val) : ''
    },
    remove(key) {
        localStorage.removeItem(encodeKey(key))
    }
}

export default { cookie, session, local }
