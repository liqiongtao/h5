import { MD5, SHA1, AES, enc, mode, pad } from 'crypto-js'

export function md5(str) {
    return String(MD5(str)).toUpperCase()
}

export function sha1(str) {
    return String(SHA1(str)).toUpperCase()
}

export function base64encode(raw) {
    try {
        return enc.Base64.stringify(enc.Utf8.parse(raw))
    } catch (e) {
        return ''
    }
}

export function base64decode(str) {
    try {
        return enc.Base64.parse(str).toString(enc.Utf8)
    } catch (e) {
        return ''
    }
}

export function encrypt(data) {
    const SECRET_KEY = enc.Utf8.parse(import.meta.env.VITE_APP_KEY)
    const SECRET_IV = enc.Utf8.parse(import.meta.env.VITE_APP_SECRET)
    if (typeof data === 'object') {
        try {
            data = JSON.stringify(data)
        } catch (error) {
            console.log('encrypt error:', error)
            return
        }
    }
    const dataHex = enc.Utf8.parse(data)
    const encrypted = AES.encrypt(dataHex, SECRET_KEY, {
        iv: SECRET_IV,
        mode: mode.CBC,
        padding: pad.Pkcs7
    })
    return encrypted.ciphertext.toString()
}

export function decrypt(data) {
    const SECRET_KEY = enc.Utf8.parse(import.meta.env.VITE_APP_KEY)
    const SECRET_IV = enc.Utf8.parse(import.meta.env.VITE_APP_SECRET)
    const encryptedHexStr = enc.Hex.parse(data)
    const str = enc.Base64.stringify(encryptedHexStr)
    const decrypt = AES.decrypt(str, SECRET_KEY, {
        iv: SECRET_IV,
        mode: mode.CBC,
        padding: pad.Pkcs7
    })
    const decryptedStr = decrypt.toString(enc.Utf8)
    return decryptedStr.toString()
}
