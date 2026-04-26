import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import {Layout} from '../components/layout/Layout'
import {OrdersListPage} from '../features/orders/pages/OrdersListPage'
import {OrderDetailsPage} from '../features/orders/pages/OrderDetailsPage'
import {TrackedOrdersPage} from '../features/orders/pages/TrackedOrdersPage'
import {GlobalStyle} from '../styles/GlobalStyle'
import {theme} from '../styles/theme'
import {NotFoundPage} from './NotFoundPage'

export function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route index element={<Navigate to="/orders" replace/>}/>
                        <Route path="/orders" element={<OrdersListPage/>}/>
                        <Route path="/orders/:id" element={<OrderDetailsPage/>}/>
                        <Route path="/tracked" element={<TrackedOrdersPage/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}
