import {useEffect} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import {ordersKeys} from '../api/queryKeys'
import {subscribeOrdersSse} from '../api/ordersSse'
import {type Order, ORDER_STATUSES, type OrderStatus} from '../types'

function toOrderStatus(value: string | null | undefined): OrderStatus | null {
    if (value == null) return null
    return (ORDER_STATUSES as readonly string[]).includes(value) ? (value as OrderStatus) : null
}

export function useOrdersStatusSync() {
    const qc = useQueryClient()

    useEffect(() => {
        const sub = subscribeOrdersSse((event) => {
            const {orderNumber, newStatus, occurredAt} = event
            if (orderNumber == null) return

            const status = toOrderStatus(newStatus)

            qc.setQueryData<Order>(ordersKeys.detail(orderNumber), (prev) => {
                if (!prev) return prev
                return {
                    ...prev,
                    status: status ?? prev.status,
                    updatedAt: occurredAt ?? prev.updatedAt,
                }
            })

            void qc.invalidateQueries({queryKey: ordersKeys.lists()})
            void qc.invalidateQueries({queryKey: ordersKeys.detail(orderNumber)})
        })

        return () => sub.stop()
    }, [qc])
}
