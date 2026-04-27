import styled, {keyframes} from 'styled-components'

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`

const Wrapper = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({theme}) => theme.colors.textMuted};
`

const Circle = styled.span`
    width: 16px;
    height: 16px;
    border: 2px solid ${({theme}) => theme.colors.border};
    border-top-color: ${({theme}) => theme.colors.accent};
    border-radius: 50%;
    animation: ${spin} 0.7s linear infinite;
`

export function Spinner({label}: { label?: string }) {
    return (
        <Wrapper role="status" aria-live="polite">
            <Circle/>
            {label && <span>{label}</span>}
        </Wrapper>
    )
}
