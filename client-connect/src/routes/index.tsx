import { Routes, Route, Link } from 'react-router-dom'
import { LoginView } from '../views/public/login.view';
import { SignUpView } from '../views/public/signUp.view';
import { Icon, Menu } from 'semantic-ui-react';
import { NotFound404 } from '../views/public/NotFound404.view';
import { CompaniesView } from '../views/public/companies.view';
import { useGlobalContext } from '../contexts/global.context';

export function ProtectedRoutes() {
    const { state: { user }, onLogout } = useGlobalContext()

    return (
        <div>
            <header>
                <Menu>
                    <Menu.Menu position='left'>
                        <Menu.Item>
                            <Link to="/companies"><Icon name="home" />  Client Connect</Link>
                        </Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Icon name="user" /> Welcome, {user?.firstName}
                        </Menu.Item>
                        <Menu.Item onClick={() => onLogout?.()}>
                            Log Out
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </header>
            <Routes>
                <Route path="/" element={<LoginView />} />
                <Route path="/companies" >
                    <Route path=":id" element={<CompaniesView />} />
                    <Route path="" element={<CompaniesView />} />
                </Route>
                <Route path="/login" element={<LoginView />} />
                <Route path="*" element={<NotFound404 />} />
            </Routes>
        </div>
    );
}

export function PublicRoutes() {
    const { state: { loggedIn, user }, onLogout } = useGlobalContext()

    return (
        <div>
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
            <Routes>
                <Route path="/" element={<LoginView />} />
                <Route path="/companies" >
                    <Route path=":id" element={<CompaniesView />} />
                    <Route path="" element={<CompaniesView />} />
                </Route>
                <Route path="/login" element={<LoginView />} />
                <Route path="/sign-up" element={<SignUpView />} />
                <Route path="*" element={<NotFound404 />} />
            </Routes>
        </div>
    );
}