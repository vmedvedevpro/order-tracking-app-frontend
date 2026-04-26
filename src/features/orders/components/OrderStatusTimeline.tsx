import styled, {css} from 'styled-components'
import type {OrderStatus} from '../types'
import {ORDER_STATUS_LABELS} from '../types'

const PROGRESS_FLOW: OrderStatus[] = ['Created', 'Shipped', 'Delivered']

type StepState = 'past' | 'current' | 'future' | 'cancelled'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
`

const stepStyles = (state: StepState) => {
    switch (state) {
        case 'past':
            return css`
                color: ${({theme}) => theme.colors.successText};
                background: ${({theme}) => theme.colors.successBg};
                border-color: ${({theme}) => theme.colors.successBorder};

                & > span:first-child {
                    background: ${({theme}) => theme.colors.success};
                }
            `
        case 'current':
            return css`
                color: ${({theme}) => theme.colors.accent};
                background: ${({theme}) => theme.colors.accentSoft};
                border-color: ${({theme}) => theme.colors.accentBorder};
                font-weight: 600;

                & > span:first-child {
                    background: ${({theme}) => theme.colors.accent};
                    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
                }
            `
        case 'cancelled':
            return css`
                color: ${({theme}) => theme.colors.dangerText};
                background: ${({theme}) => theme.colors.dangerBg};
                border-color: ${({theme}) => theme.colors.dangerBorder};

                & > span:first-child {
                    background: ${({theme}) => theme.colors.danger};
                }
            `
        case 'future':
        default:
            return css``
    }
}

const Step = styled.div<{ $state: StepState; $withArrow: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.75rem;
    border-radius: ${({theme}) => theme.radii.pill};
    background: ${({theme}) => theme.colors.surfaceHover};
    color: ${({theme}) => theme.colors.textMuted};
    font-size: 0.9rem;
    border: 1px solid ${({theme}) => theme.colors.border};

    ${({$state}) => stepStyles($state)}

    ${({$withArrow, theme}) =>
            $withArrow &&
            css`
                &::after {
                    content: '→';
                    margin-left: 0.5rem;
                    color: ${theme.colors.textMuted};
                }
            `}
`

const Dot = styled.span`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({theme}) => theme.colors.border};
`

interface OrderStatusTimelineProps {
    status: OrderStatus | undefined
}

export function OrderStatusTimeline({status}: OrderStatusTimelineProps) {
    if (!status) return null

    if (status === 'Cancelled') {
        return (
            <Wrapper>
                <Step $state="cancelled" $withArrow={false}>
                    <Dot/>
                    <span>{ORDER_STATUS_LABELS.Cancelled}</span>
                </Step>
            </Wrapper>
        )
    }

    const currentIndex = PROGRESS_FLOW.indexOf(status)

    return (
        <Wrapper>
            {PROGRESS_FLOW.map((step, idx) => {
                const state: StepState =
                    idx < currentIndex ? 'past' : idx === currentIndex ? 'current' : 'future'
                return (
                    <Step key={step} $state={state} $withArrow={idx < PROGRESS_FLOW.length - 1}>
                        <Dot/>
                        <span>{ORDER_STATUS_LABELS[step]}</span>
                    </Step>
                )
            })}
        </Wrapper>
    )
}
