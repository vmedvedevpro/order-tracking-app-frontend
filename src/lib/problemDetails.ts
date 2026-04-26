import type {HttpValidationProblemDetails, ProblemDetails} from '@/api/generated'

export function isProblemDetails(value: unknown): value is ProblemDetails {
    return typeof value === 'object' && value !== null && ('title' in value || 'detail' in value)
}

export function isValidationProblem(value: unknown): value is HttpValidationProblemDetails {
    return isProblemDetails(value) && 'errors' in value && typeof (value as { errors: unknown }).errors === 'object'
}

export function extractErrorMessage(error: unknown): string {
    if (isValidationProblem(error)) {
        const errors = error.errors ?? {}
        const flat = Object.values(errors).flat()
        if (flat.length > 0) {
            return flat.join('\n')
        }
    }
    if (isProblemDetails(error)) {
        return error.detail ?? error.title ?? 'Something went wrong'
    }
    if (error instanceof Error) {
        return error.message
    }
    return 'Something went wrong'
}
