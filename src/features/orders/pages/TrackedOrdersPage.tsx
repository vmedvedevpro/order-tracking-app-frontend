import {useQueries} from '@tanstack/react-query'
import {useTrackedOrdersStore} from '../store/trackedOrdersStore'
import {fetchOrderById} from '../api/ordersApi'
import {ordersKeys} from '../api/queryKeys'
import {OrdersTable} from '../components/OrdersTable'
import {Spinner} from '@/components/ui/Spinner'
import {Alert, Button, Card, EmptyState, Page, PageHeader, PageSubtitle,} from '@/components/ui/primitives'
import type {Order} from '../types'

export function TrackedOrdersPage() {
    const trackedIds = useTrackedOrdersStore((s) => s.trackedOrderIds)
    const clear = useTrackedOrdersStore((s) => s.clear)

    const queries = useQueries({
        queries: trackedIds.map((id) => ({
            queryKey: ordersKeys.detail(id),
            queryFn: () => fetchOrderById(id),
        })),
    })

    const isLoading = queries.some((q) => q.isPending) && trackedIds.length > 0
    const orders: Order[] = queries
        .map((q) => q.data)
        .filter((o): o is Order => o != null)
    const missing: number[] = queries
        .map((q, idx) => (q.isError ? trackedIds[idx] : null))
        .filter((id): id is number => id != null)

    return (
        <Page>
            <PageHeader>
                <div>
                    <h1>Tracked orders</h1>
                    <PageSubtitle>
                        Orders you starred. The list is stored locally in your browser.
                    </PageSubtitle>
                </div>
                {trackedIds.length > 0 && (
                    <Button type="button" $variant="ghost" $size="sm" onClick={() => clear()}>
                        Clear list
                    </Button>
                )}
            </PageHeader>

            {isLoading && <Spinner label="Loading…"/>}

            {!isLoading && trackedIds.length === 0 && (
                <EmptyState>
                    You aren&apos;t tracking any orders yet. Open the orders list and click ☆.
                </EmptyState>
            )}

            {!isLoading && orders.length > 0 && (
                <Card>
                    <OrdersTable orders={orders}/>
                </Card>
            )}

            {!isLoading && missing.length > 0 && (
                <Alert $tone="warn">
                    Could not load orders: {missing.map((id) => `#${id}`).join(', ')}.
                </Alert>
            )}
        </Page>
    )
}
