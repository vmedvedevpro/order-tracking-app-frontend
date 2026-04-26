import {NavLink, Outlet} from 'react-router-dom'
import styled from 'styled-components'
import {useTrackedOrdersStore} from '@/features/orders/store/trackedOrdersStore.ts'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: ${({theme}) => theme.colors.bg};
`

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background: ${({theme}) => theme.colors.surface};
    border-bottom: 1px solid ${({theme}) => theme.colors.border};
    position: sticky;
    top: 0;
    z-index: 10;
`

const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 1.1rem;
`

const Logo = styled.span`
    font-size: 1.4rem;
`

const Nav = styled.nav`
    display: flex;
    gap: 0.5rem;

    a {
        position: relative;
        padding: 0.5rem 0.9rem;
        border-radius: ${({theme}) => theme.radii.md};
        color: ${({theme}) => theme.colors.textMuted};
        text-decoration: none;
        font-weight: 500;
        transition: background 0.15s,
        color 0.15s;

        &:hover {
            background: ${({theme}) => theme.colors.surfaceHover};
            color: ${({theme}) => theme.colors.text};
            text-decoration: none;
        }

        &.is-active {
            background: ${({theme}) => theme.colors.accentSoft};
            color: ${({theme}) => theme.colors.accent};
        }
    }
`

const Badge = styled.span`
    display: inline-block;
    margin-left: 0.4rem;
    background: ${({theme}) => theme.colors.accent};
    color: white;
    font-size: 0.75rem;
    padding: 0 0.45rem;
    border-radius: ${({theme}) => theme.radii.pill};
    line-height: 1.4rem;
    min-width: 1.4rem;
    text-align: center;
`

const Main = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
`

const Footer = styled.footer`
    padding: 1rem 2rem;
    text-align: center;
    color: ${({theme}) => theme.colors.textMuted};
    border-top: 1px solid ${({theme}) => theme.colors.border};
    font-size: 0.85rem;
`

export function Layout() {
    const trackedCount = useTrackedOrdersStore((s) => s.trackedOrderIds.length)

    return (
        <Wrapper>
            <Header>
                <Brand>
                    <Logo>📦</Logo>
                    <span>Order Tracking</span>
                </Brand>
                <Nav>
                    <NavLink to="/orders" className={({isActive}) => (isActive ? 'is-active' : undefined)}>
                        Orders
                    </NavLink>
                    <NavLink to="/tracked" className={({isActive}) => (isActive ? 'is-active' : undefined)}>
                        Tracked
                        {trackedCount > 0 && <Badge>{trackedCount}</Badge>}
                    </NavLink>
                </Nav>
            </Header>

            <Main>
                <Outlet/>
            </Main>

            <Footer>
                <span>Order Tracking App &middot; 2026</span>
            </Footer>
        </Wrapper>
    )
}
