import {client} from '../api/generated/client.gen'

/**
 * Configuration for the generated axios client.
 * In dev, baseURL is empty — relative /api/... requests are proxied by Vite.
 * In production it's set via VITE_API_BASE_URL.
 */
export function configureApiClient(): void {
    const baseURL = import.meta.env.VITE_API_BASE_URL ?? ''
    client.setConfig({
        baseURL,
    })
}
