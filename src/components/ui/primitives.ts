import styled, {css} from 'styled-components'

export const Page = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`

export const PageHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
`

export const PageSubtitle = styled.p`
    margin: 0.25rem 0 0;
    color: ${({theme}) => theme.colors.textMuted};
`

export const PageBreadcrumbs = styled.div`
    font-size: 0.9rem;
`

export const Card = styled.section`
    background: ${({theme}) => theme.colors.surface};
    border: 1px solid ${({theme}) => theme.colors.border};
    border-radius: ${({theme}) => theme.radii.lg};
    padding: 1.25rem 1.5rem;
    box-shadow: ${({theme}) => theme.shadows.card};
`

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
`

export const CardTitle = styled.h2`
    margin: 0 0 0.75rem;
`

type ButtonVariant = 'primary' | 'ghost'
type ButtonSize = 'md' | 'sm'

interface ButtonProps {
    $variant?: ButtonVariant
    $size?: ButtonSize
}

const buttonVariant = (variant: ButtonVariant) => {
    switch (variant) {
        case 'primary':
            return css`
                background: ${({theme}) => theme.colors.accent};
                color: white;

                &:hover:not(:disabled) {
                    background: ${({theme}) => theme.colors.accentHover};
                }
            `
        case 'ghost':
            return css`
                background: transparent;
                border-color: ${({theme}) => theme.colors.border};
                color: ${({theme}) => theme.colors.text};

                &:hover:not(:disabled) {
                    background: ${({theme}) => theme.colors.surfaceHover};
                }
            `
    }
}

export const Button = styled.button<ButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: ${({$size}) => ($size === 'sm' ? '0.35rem 0.7rem' : '0.55rem 1rem')};
    font-size: ${({$size}) => ($size === 'sm' ? '0.85rem' : '0.95rem')};
    border-radius: ${({theme}) => theme.radii.md};
    border: 1px solid transparent;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s,
    border-color 0.15s,
    color 0.15s;

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    ${({$variant = 'primary'}) => buttonVariant($variant)}
`

export const Alert = styled.div<{ $tone?: 'error' | 'warn' }>`
    padding: 0.75rem 1rem;
    border-radius: ${({theme}) => theme.radii.md};
    font-size: 0.92rem;
    white-space: pre-line;

    ${({$tone = 'error', theme}) =>
            $tone === 'error'
                    ? css`
                        background: #fef2f2;
                        color: ${theme.colors.dangerText};
                        border: 1px solid ${theme.colors.dangerBorder};
                    `
                    : css`
                        background: #fff7ed;
                        color: ${theme.colors.warningText};
                        border: 1px solid #fed7aa;
                    `}
`

export const EmptyState = styled.div`
    padding: 2rem 1rem;
    text-align: center;
    color: ${({theme}) => theme.colors.textMuted};
    border: 1px dashed ${({theme}) => theme.colors.border};
    border-radius: 10px;
    background: ${({theme}) => theme.colors.surface};
`

export const FormRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1rem;

    label {
        font-size: 0.9rem;
        font-weight: 500;
        color: ${({theme}) => theme.colors.textMuted};
    }

    input,
    textarea {
        font: inherit;
        padding: 0.55rem 0.75rem;
        border: 1px solid ${({theme}) => theme.colors.border};
        border-radius: ${({theme}) => theme.radii.md};
        background: ${({theme}) => theme.colors.surface};
        color: ${({theme}) => theme.colors.text};
        resize: vertical;

        &:focus {
            outline: none;
            border-color: ${({theme}) => theme.colors.accent};
            box-shadow: 0 0 0 3px ${({theme}) => theme.colors.accentSoft};
        }
    }
`

export const FormActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
`
