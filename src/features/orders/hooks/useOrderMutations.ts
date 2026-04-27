import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createOrder, updateOrder} from '../api/ordersApi'
import {ordersKeys} from '../api/queryKeys'
import type {Order} from '../types'

export function useCreateOrder() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: createOrder,
        onSuccess: (order: Order) => {
            void qc.invalidateQueries({queryKey: ordersKeys.lists()})
            if (order.orderNumber != null) {
                qc.setQueryData(ordersKeys.detail(order.orderNumber), order)
            }
        },
    })
}

export function useUpdateOrder() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: updateOrder,
        onSuccess: (order: Order) => {
            void qc.invalidateQueries({queryKey: ordersKeys.lists()})
            if (order.orderNumber != null) {
                qc.setQueryData(ordersKeys.detail(order.orderNumber), order)
            }
        },
    })
}
