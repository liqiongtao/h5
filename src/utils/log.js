import { session } from '@/utils/cache'

export function debug(...messages) {
    if (import.meta.env.MODE == 'prod' && !session.get('__debug__')) {
        return
    }
    console.log('[h5]', ...messages)
}
