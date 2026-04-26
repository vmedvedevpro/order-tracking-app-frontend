import {useQuery} from '@tanstack/react-query'
import {fetchOrderById} from '../api/ordersApi'
import {ordersKeys} from '../api/queryKeys'
import {extractErrorMessage} from '@/lib/problemDetails'

export function useOrder(id: number | null) {
    const isValidId = id != null && !Number.isNaN(id)

    const result = useQuery({
        queryKey: isValidId ? ordersKeys.detail(id) : ['order', 'invalid'],
        queryFn: () => fetchOrderById(id as number),
        enabled: isValidId,
    })

    return {
        data: result.data ?? null,
        isLoading: isValidId ? result.isPending : false,
        error: !isValidId
            ? 'Invalid order number'
            : result.error
                ? extractErrorMessage(result.error)
                : null,
        refetch: result.refetch,
    }
}
