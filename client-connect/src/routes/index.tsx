import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { LoginView } from '../views/public/login.view';
import { SignUpView } from '../views/public/signUp.view';
import { Icon, Menu } from 'semantic-ui-react';
import { NotFound404 } from '../views/public/NotFound404.view';
import { CompaniesView } from '../views/public/companies.view';
import { useGlobalContext } from '../contexts/global.context';
import { ConnectedCompaniesView } from '../views/protected/connectedCompanies.view';
import { ReactNode } from 'react';
import { usePreferencesContext } from '../contexts/preferences.context';
import { AccountView } from '../views/protected/account.view';

type ProtectedViewProps = {
    children: ReactNode
}

export function ProtectedView({ children }: ProtectedViewProps) {
    const { state: { loggedIn } } = useGlobalContext();
    const navigate = useNavigate();
    if (!loggedIn) {
        navigate('/login')
    }
    return <>{children}</>
}

export function ProtectedMenu() {
    const { state: { user }, onLogout } = useGlobalContext()
    return (
        <header>
            <Menu>
                <Menu.Menu position='left'>
                    <Menu.Item>
                        <Link to="/companies"><Icon name="home" />  Client Connect</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/connected-companies"><Icon name="building" />Connected Companies</Link>
                    </Menu.Item>
                </Menu.Menu>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Link to="/account">
                            <Icon name="user" /> Welcome, {user?.firstName}
                        </Link>
                    </Menu.Item>
                    <Menu.Item onClick={() => onLogout?.()}>
                        Log Out
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </header>
    )
}
export function PublicMenu() {
    return (
        <header>
            <Menu>
                <Menu.Menu position='left'>
                    <Menu.Item>
                        <Link to="/companies"><Icon name="home" />  Client Connect</Link>
                    </Menu.Item>
                </Menu.Menu>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Link to="/login">Log In</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/sign-up">Sign Up</Link>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </header>
    )
}

export function MainRoutes() {
    const { state: { loggedIn, user }, onLogout } = useGlobalContext();
    const { state: { theme } } = usePreferencesContext();

    return (
        <div>
            {loggedIn ? <ProtectedMenu /> : <PublicMenu />}
            <Routes>
                <Route path="/" element={<LoginView />} />
                <Route path="/companies" >
                    <Route path=":id" element={<CompaniesView />} />
                    <Route path="" element={<CompaniesView />} />
                </Route>
                <Route path="/connected-companies" >
                    <Route path=":id" element={<ProtectedView><ConnectedCompaniesView /></ProtectedView>} />
                    <Route path="" element={<ProtectedView><ConnectedCompaniesView /></ProtectedView>} />
                </Route>
                <Route path="/account" element={<ProtectedView><AccountView /></ProtectedView>} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/sign-up" element={<SignUpView />} />
                <Route path="*" element={<NotFound404 />} />
            </Routes>
            <footer>
                {theme}
            </footer>
        </div>
    );
}