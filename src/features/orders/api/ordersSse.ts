import {getApiV1OrdersSse, type OrderStatusChangedIntegrationEvent,} from '@/api/generated'

export interface OrdersSseSubscription {
    stop: () => void
}

export function subscribeOrdersSse(
    onEvent: (event: OrderStatusChangedIntegrationEvent) => void,
    onError?: (error: unknown) => void,
): OrdersSseSubscription {
    const controller = new AbortController()

    void (async () => {
        try {
            const {stream} = await getApiV1OrdersSse({
                signal: controller.signal,
                onSseError: onError,
            })
            for await (const data of stream) {
                if (controller.signal.aborted) break
                if (data && typeof data === 'object') {
                    onEvent(data as OrderStatusChangedIntegrationEvent)
                }
            }
        } catch (err) {
            if (!controller.signal.aborted) onError?.(err)
        }
    })()

    return {
        stop: () => controller.abort(),
    }
}
