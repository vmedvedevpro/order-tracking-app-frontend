import type {Order, OrderPagedResult, OrderStatus} from '@/api/generated'

export type {Order, OrderStatus, OrderPagedResult}

export const ORDER_STATUSES: readonly OrderStatus[] = [
    'Created',
    'Shipped',
    'Delivered',
    'Cancelled',
] as const

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    Created: 'Created',
    Shipped: 'Shipped',
    Delivered: 'Delivered',
    Cancelled: 'Cancelled',
}
