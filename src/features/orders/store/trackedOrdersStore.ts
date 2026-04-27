import {create} from 'zustand'
import {persist} from 'zustand/middleware'

interface TrackedOrdersState {
    trackedOrderIds: number[]
    isTracked: (orderNumber: number) => boolean
    track: (orderNumber: number) => void
    untrack: (orderNumber: number) => void
    toggle: (orderNumber: number) => void
    clear: () => void
}

export const useTrackedOrdersStore = create<TrackedOrdersState>()(
    persist(
        (set, get) => ({
            trackedOrderIds: [],
            isTracked: (orderNumber) => get().trackedOrderIds.includes(orderNumber),
            track: (orderNumber) =>
                set((state) =>
                    state.trackedOrderIds.includes(orderNumber)
                        ? state
                        : {trackedOrderIds: [...state.trackedOrderIds, orderNumber]},
                ),
            untrack: (orderNumber) =>
                set((state) => ({
                    trackedOrderIds: state.trackedOrderIds.filter((id) => id !== orderNumber),
                })),
            toggle: (orderNumber) =>
                set((state) =>
                    state.trackedOrderIds.includes(orderNumber)
                        ? {trackedOrderIds: state.trackedOrderIds.filter((id) => id !== orderNumber)}
                        : {trackedOrderIds: [...state.trackedOrderIds, orderNumber]},
                ),
            clear: () => set({trackedOrderIds: []}),
        }),
        {
            name: 'tracked-orders',
            version: 1,
        },
    ),
)
