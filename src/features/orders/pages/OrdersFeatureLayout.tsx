import {Outlet} from 'react-router-dom'
import {useOrdersStatusSync} from '../hooks/useOrdersStatusSync'

export function OrdersFeatureLayout() {
    useOrdersStatusSync()
    return <Outlet/>
}
