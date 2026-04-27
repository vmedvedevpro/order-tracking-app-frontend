import styled, {css} from 'styled-components'
import type {OrderStatus} from '@/api/generated'
import {ORDER_STATUS_LABELS} from '@/features/orders/types'

interface StatusBadgeProps {
    status: OrderStatus | undefined
}

type Tone = OrderStatus | 'unknown'

const toneStyles = (tone: Tone) => {
    switch (tone) {
        case 'Created':
            return css`
                background: #eef2ff;
                color: #4338ca;
                border-color: #c7d2fe;
            `
        case 'Shipped':
            return css`
                background: #fef3c7;
                color: #92400e;
                border-color: #fde68a;
            `
        case 'Delivered':
            return css`
                background: #dcfce7;
                color: #166534;
                border-color: #bbf7d0;
            `
        case 'Cancelled':
            return css`
                background: #fee2e2;
                color: #991b1b;
                border-color: #fecaca;
            `
        case 'unknown':
        default:
            return css`
                background: #f3f4f6;
                color: #6b7280;
                border-color: #e5e7eb;
            `
    }
}

const Badge = styled.span<{ $tone: Tone }>`
    display: inline-block;
    padding: 0.2rem 0.6rem;
    border-radius: ${({theme}) => theme.radii.pill};
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    border: 1px solid transparent;
    ${({$tone}) => toneStyles($tone)}
`

export function StatusBadge({status}: StatusBadgeProps) {
    if (!status) return <Badge $tone="unknown">—</Badge>
    return <Badge $tone={status}>{ORDER_STATUS_LABELS[status]}</Badge>
}
