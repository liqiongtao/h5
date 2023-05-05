import { debug } from '@/utils/log'

const jsApiList = [
    'onMenuShareAppMessage',
    'onMenuShareTimeline',
    'updateAppMessageShareData',
    'updateTimelineShareData',
    'openLocation',
    'getLocation',
    'hideMenuItems',
    'showMenuItems',
    'chooseWXPay'
]

const hideMenuItems = [
    'menuItem:copyUrl', // 复制链接
    'menuItem:delete', // 删除
    'menuItem:originPage' // 原网页
]

const showMenuItems = [
    'menuItem:share:appMessage', // 发送给朋友
    'menuItem:share:timeline', // 分享到朋友圈
    'menuItem:favorite' // 收藏
]

export function init({ appId, timestamp, nonceStr, signature }) {
    if (!window.wx) return

    const options = {
        debug: false,
        appId, timestamp, nonceStr, signature, jsApiList
    }
    debug('[wechat-init]', options)
    window.wx.config(options)

    window.wx.ready(() => {
        window.wx.checkJsApi({
            jsApiList,
            success: () => {
                window.wx.hideAllNonBaseMenuItem()
                window.wx.hideMenuItems({ menuList: hideMenuItems })
                window.wx.showMenuItems({ menuList: showMenuItems })
            }
        })
    })

    window.wx.error(res => {
        debug('[wechat-error]', res)
    })
}

export function shareInit({ title, desc, link, imgUrl }) {
    window.wx.ready(() => {
        jsApiList.forEach(api => {
            window.wx[api] && window.wx[api]({
                title,
                desc,
                link: link || window.location.href,
                imgUrl
            })
        })
    })
}
