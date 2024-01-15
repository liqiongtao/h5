<script setup>
    import { onMounted } from 'vue'
    import { session } from '@/utils/cache'

    onMounted(() => {
        if (import.meta.env.MODE != 'prod' || session.get('debug') || window.location.href.indexOf('debug') !== -1) {
            new window.VConsole({ theme: 'light', maxLogNumber: 1000 })
        }
    })
</script>

<template>
    <router-view></router-view>
</template>
