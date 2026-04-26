import {Link, useParams} from 'react-router-dom'
import styled from 'styled-components'
import {useOrder} from '../hooks/useOrder'
import {OrderStatusTimeline} from '../components/OrderStatusTimeline'
import {TrackToggle} from '../components/TrackToggle'
import {StatusBadge} from '@/components/ui/StatusBadge'
import {Spinner} from '@/components/ui/Spinner'
import {Alert, Card, Page, PageBreadcrumbs,} from '@/components/ui/primitives'

const Head = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
`

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    h1 {
        margin: 0;
    }
`

const Meta = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
`

const Section = styled.section`
    margin-top: 1.5rem;

    h2 {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: ${({theme}) => theme.colors.textMuted};
        margin-bottom: 0.5rem;
    }
`

const Description = styled.p`
    margin: 0;
    white-space: pre-wrap;
`

const Grid = styled.dl`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 0;

    dt {
        font-size: 0.8rem;
        color: ${({theme}) => theme.colors.textMuted};
        margin-bottom: 0.2rem;
    }

    dd {
        margin: 0;
        font-weight: 500;
    }
`

function parseId(raw: string | undefined): number | null {
    if (!raw) return null
    const n = Number(raw)
    return Number.isFinite(n) ? n : null
}

function formatDate(value: string | undefined): string {
    if (!value) return '—'
    const d = new Date(value)
    return Number.isNaN(d.getTime())
        ? value
        : d.toLocaleString('en-US', {dateStyle: 'long', timeStyle: 'medium'})
}

export function OrderDetailsPage() {
    const {id} = useParams<{ id: string }>()
    const orderId = parseId(id)
    const {data, isLoading, error} = useOrder(orderId)

    return (
        <Page>
            <PageBreadcrumbs>
                <Link to="/orders">&larr; Back to list</Link>
            </PageBreadcrumbs>

            {isLoading && <Spinner label="Loading order…"/>}
            {error && <Alert>{error}</Alert>}

            {data && (
                <Card as="article">
                    <Head>
                        <div>
                            <TitleRow>
                                <h1>Order #{data.orderNumber}</h1>
                                {data.orderNumber != null && <TrackToggle orderNumber={data.orderNumber}/>}
                            </TitleRow>
                            <Meta>
                                <StatusBadge status={data.status}/>
                            </Meta>
                        </div>
                    </Head>

                    <Section>
                        <h2>Progress</h2>
                        <OrderStatusTimeline status={data.status}/>
                    </Section>

                    <Section>
                        <h2>Description</h2>
                        <Description>{data.description || <em>no description</em>}</Description>
                    </Section>

                    <Section>
                        <h2>Details</h2>
                        <Grid>
                            <div>
                                <dt>Created</dt>
                                <dd>{formatDate(data.createdAt)}</dd>
                            </div>
                            <div>
                                <dt>Updated</dt>
                                <dd>{formatDate(data.updatedAt)}</dd>
                            </div>
                        </Grid>
                    </Section>
                </Card>
            )}
        </Page>
    )
}
