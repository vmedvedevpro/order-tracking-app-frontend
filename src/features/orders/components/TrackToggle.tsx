import styled from 'styled-components'
import {useTrackedOrdersStore} from '../store/trackedOrdersStore'

const ToggleButton = styled.button<{ $on: boolean }>`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.15rem;
    color: ${({$on, theme}) => ($on ? theme.colors.star : theme.colors.textMuted)};
    padding: 0.15rem 0.3rem;
    border-radius: ${({theme}) => theme.radii.sm};

    &:hover {
        background: ${({theme}) => theme.colors.surfaceHover};
    }
`

interface TrackToggleProps {
    orderNumber: number
}

export function TrackToggle({orderNumber}: TrackToggleProps) {
    const isTracked = useTrackedOrdersStore((s) => s.trackedOrderIds.includes(orderNumber))
    const toggle = useTrackedOrdersStore((s) => s.toggle)

    return (
        <ToggleButton
            type="button"
            $on={isTracked}
            onClick={() => toggle(orderNumber)}
            aria-label={isTracked ? 'Remove from tracked' : 'Add to tracked'}
            title={isTracked ? 'Remove from tracked' : 'Add to tracked'}
        >
            {isTracked ? '★' : '☆'}
        </ToggleButton>
    )
}
