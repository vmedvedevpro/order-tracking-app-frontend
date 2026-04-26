import styled from 'styled-components'
import {Button} from '@/components/ui/primitives.ts'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
`

const Label = styled.span`
    color: ${({theme}) => theme.colors.textMuted};
    font-size: 0.9rem;
`

interface PaginationProps {
    pageNumber: number
    totalPages: number
    onChange: (page: number) => void
}

export function Pagination({pageNumber, totalPages, onChange}: PaginationProps) {
    if (totalPages <= 1) return null

    return (
        <Wrapper>
            <Button
                type="button"
                $variant="ghost"
                $size="sm"
                disabled={pageNumber <= 1}
                onClick={() => onChange(pageNumber - 1)}
            >
                &larr; Prev
            </Button>
            <Label>
                Page {pageNumber} of {totalPages}
            </Label>
            <Button
                type="button"
                $variant="ghost"
                $size="sm"
                disabled={pageNumber >= totalPages}
                onClick={() => onChange(pageNumber + 1)}
            >
                Next &rarr;
            </Button>
        </Wrapper>
    )
}
