import type {CreateOrderCommand, Order, OrderPagedResult, UpdateOrderCommand,} from '@/api/generated'
import {getApiV1Orders, getApiV1OrdersById, postApiV1Orders, putApiV1Orders,} from '@/api/generated'

export interface OrdersListQuery {
    pageNumber?: number
    pageSize?: number
}

export async function fetchOrders(query: OrdersListQuery = {}): Promise<OrderPagedResult> {
    const {data, error} = await getApiV1Orders({
        query: {
            PageNumber: query.pageNumber,
            PageSize: query.pageSize,
        },
    })
    if (error) throw error
    return data ?? {items: [], count: 0, pageNumber: 1, totalItems: 0, totalPages: 0}
}

export async function fetchOrderById(id: number): Promise<Order> {
    const {data, error} = await getApiV1OrdersById({path: {id}})
    if (error) throw error
    if (!data) throw new Error('Order not found')
    return data
}

export async function createOrder(command: CreateOrderCommand): Promise<Order> {
    const {data, error} = await postApiV1Orders({body: command})
    if (error) throw error
    if (!data) throw new Error('Failed to create order')
    return data
}

export async function updateOrder(command: UpdateOrderCommand): Promise<Order> {
    const {data, error} = await putApiV1Orders({body: command})
    if (error) throw error
    if (!data) throw new Error('Failed to update order')
    return data
}
