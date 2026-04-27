import {type FormEvent, useState} from 'react'
import {useCreateOrder} from '../hooks/useOrderMutations'
import {extractErrorMessage} from '@/lib/problemDetails'
import {Alert, Button, Card, CardTitle, FormActions, FormRow,} from '@/components/ui/primitives'
import type {Order} from '../types'

interface CreateOrderFormProps {
    onCreated: (order: Order) => void
}

export function CreateOrderForm({onCreated}: CreateOrderFormProps) {
    const [description, setDescription] = useState('')
    const createMutation = useCreateOrder()

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const order = await createMutation.mutateAsync({
                description: description.trim() || null,
            })
            setDescription('')
            onCreated(order)
        } catch {
            // ошибка отображается через createMutation.error
        }
    }

    const isSubmitting = createMutation.isPending
    const error = createMutation.error ? extractErrorMessage(createMutation.error) : null

    return (
        <Card as="form" onSubmit={handleSubmit}>
            <CardTitle>New order</CardTitle>
            <FormRow>
                <label htmlFor="order-description">Description</label>
                <textarea
                    id="order-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Deliver 2 Dell laptops to the warehouse"
                    rows={3}
                    disabled={isSubmitting}
                />
            </FormRow>
            {error && <Alert>{error}</Alert>}
            <FormActions>
                <Button type="submit" $variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating…' : 'Create order'}
                </Button>
            </FormActions>
        </Card>
    )
}
