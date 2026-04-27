import {useQuery} from '@tanstack/react-query'
import {fetchOrders, type OrdersListQuery} from '../api/ordersApi'
import {ordersKeys} from '../api/queryKeys'
import {extractErrorMessage} from '@/lib/problemDetails'

export function useOrders(query: OrdersListQuery) {
    const result = useQuery({
        queryKey: ordersKeys.list(query),
        queryFn: () => fetchOrders(query),
        placeholderData: (prev) => prev,
    })

    return {
        data: result.data ?? null,
        isLoading: result.isPending,
        error: result.error ? extractErrorMessage(result.error) : null,
        refetch: result.refetch,
    }
}
