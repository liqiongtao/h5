import { session, local } from '@/utils/cache'

export function debug(...messages) {
    if (import.meta.env.MODE == 'prod' && !session.get('debug') && !local.get('debug')) {
        return
    }
    console.log('[h5]', ...messages)
}
