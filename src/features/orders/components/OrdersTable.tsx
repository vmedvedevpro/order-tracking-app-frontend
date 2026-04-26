import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {StatusBadge} from '@/components/ui/StatusBadge.tsx'
import {TrackToggle} from './TrackToggle'
import type {Order} from '../types'

const Wrapper = styled.div`
    overflow-x: auto;
`

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 0.94rem;

    th,
    td {
        text-align: left;
        padding: 0.65rem 0.75rem;
        border-bottom: 1px solid ${({theme}) => theme.colors.border};
        vertical-align: middle;
    }

    th {
        background: ${({theme}) => theme.colors.surfaceHover};
        font-weight: 600;
        color: ${({theme}) => theme.colors.textMuted};
        font-size: 0.82rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
    }

    tbody tr {
        cursor: pointer;
    }

    tbody tr:hover {
        background: ${({theme}) => theme.colors.surfaceHover};
    }
`

const NumberCell = styled.td`
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    white-space: nowrap;
`

const DescriptionCell = styled.td`
    max-width: 360px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const Empty = styled.div`
    padding: 2rem 1rem;
    text-align: center;
    color: ${({theme}) => theme.colors.textMuted};
`

function formatDate(value: string | undefined): string {
    if (!value) return '—'
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return value
    return d.toLocaleString('en-US', {dateStyle: 'short', timeStyle: 'short'})
}

interface OrdersTableProps {
    orders: Order[]
}

export function OrdersTable({orders}: OrdersTableProps) {
    const navigate = useNavigate()

    if (orders.length === 0) {
        return <Empty>No orders yet.</Empty>
    }

    return (
        <Wrapper>
            <Table>
                <thead>
                <tr>
                    <th style={{width: '1%'}}></th>
                    <th>#</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Updated</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr
                        key={order.orderNumber}
                        onDoubleClick={() => {
                            if (order.orderNumber != null) {
                                navigate(`/orders/${order.orderNumber}`)
                            }
                        }}
                    >
                        <td onDoubleClick={(e) => e.stopPropagation()}>
                            {order.orderNumber != null && <TrackToggle orderNumber={order.orderNumber}/>}
                        </td>
                        <NumberCell>#{order.orderNumber}</NumberCell>
                        <DescriptionCell>
                            {order.description || <em>no description</em>}
                        </DescriptionCell>
                        <td>
                            <StatusBadge status={order.status}/>
                        </td>
                        <td>{formatDate(order.createdAt)}</td>
                        <td>{formatDate(order.updatedAt)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Wrapper>
    )
}
