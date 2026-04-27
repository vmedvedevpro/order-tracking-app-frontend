import {useState} from 'react'
import {useOrders} from '../hooks/useOrders'
import {CreateOrderForm} from '../components/CreateOrderForm'
import {OrdersTable} from '../components/OrdersTable'
import {Pagination} from '../components/Pagination'
import {Spinner} from '@/components/ui/Spinner'
import {Alert, Card, CardHeader, CardTitle, Page, PageHeader, PageSubtitle,} from '@/components/ui/primitives'

const PAGE_SIZE = 10

export function OrdersListPage() {
    const [pageNumber, setPageNumber] = useState(1)
    const {data, isLoading, error, refetch} = useOrders({pageNumber, pageSize: PAGE_SIZE})

    return (
        <Page>
            <PageHeader>
                <div>
                    <h1>Orders</h1>
                    <PageSubtitle>
                        All orders. Star the ones you want to track.
                    </PageSubtitle>
                </div>
            </PageHeader>

            <CreateOrderForm
                onCreated={() => {
                    setPageNumber(1)
                    void refetch()
                }}
            />

            <Card>
                <CardHeader>
                    <CardTitle>All orders</CardTitle>
                </CardHeader>

                {isLoading && <Spinner label="Loading orders…"/>}
                {error && <Alert>{error}</Alert>}

                {!isLoading && !error && data && (
                    <>
                        <OrdersTable orders={data.items ?? []}/>
                        <Pagination
                            pageNumber={data.pageNumber ?? 1}
                            totalPages={data.totalPages ?? 1}
                            onChange={setPageNumber}
                        />
                    </>
                )}
            </Card>
        </Page>
    )
}
