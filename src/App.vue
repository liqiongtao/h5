<script setup>
    import { session } from '@/utils/cache'
    // import { get } from '@/utils/http'
    // import { init, shareInit } from '@/utils/wechat'

    onMounted(() => {
        if (import.meta.env.MODE != 'prod' || session.get('debug') || window.location.href.indexOf('debug') !== -1) {
            new window.VConsole({ theme: 'light', maxLogNumber: 1000 })
        }
    })

    // get('/v1/wechat/share/config?url=' + encodeURIComponent(window.location.href)).then(res => {
    //     init(res.data || {})
    //     shareInit({
    //         title: '',
    //         desc: '',
    //         link: window.location.href,
    //         imgUrl: ''
    //     })
    // })
</script>

<template>
    <router-view></router-view>
</template>
