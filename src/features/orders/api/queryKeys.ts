import type {OrdersListQuery} from './ordersApi'

export const ordersKeys = {
    all: ['orders'] as const,
    lists: () => [...ordersKeys.all, 'list'] as const,
    list: (query: OrdersListQuery) => [...ordersKeys.lists(), query] as const,
    details: () => [...ordersKeys.all, 'detail'] as const,
    detail: (id: number) => [...ordersKeys.details(), id] as const,
}
