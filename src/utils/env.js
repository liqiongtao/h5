const ua = window.navigator.userAgent
const platform = navigator.platform.toLowerCase()

// 是否生产环境
export const isProd = import.meta.env.MODE == 'prod'

// 是否测试环境
export const isTest = import.meta.env.MODE == 'test'

// 是否开发环境
export const isDev = import.meta.env.MODE == 'dev'

// 系统浏览器
export const isH5 = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) && !/(micromessenger)/i.test(ua) && ua.match(/wxwork/i) != 'wxwork'

// 是否微信
export const isWechat = /(micromessenger)/i.test(ua) && ua.match(/wxwork/i) != 'wxwork'

// 是否企微
export const isQYWechat = /(micromessenger)/i.test(ua) && ua.match(/wxwork/i) == 'wxwork'

// 是否手机
export const isMobile = /mobile/i.test(ua)

// 是否android
export const isAndroid = /android/i.test(ua)

// 是否ios
export const isIOS = /iphone|ipad|ipod/i.test(ua)

// 是否safari浏览器
export const isSafari = /Safari/i.test(ua)

// 是否windonw系统
export const isWin = /win32|win64|windows/i.test(platform)

// 是否mac系统
export const isMac = /Mac68K|MacPPC|Macintosh|MacIntel/i.test(platform)
