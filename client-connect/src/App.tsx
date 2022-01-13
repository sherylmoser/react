import './styles/App.css';
import { useGlobalContext } from './contexts/global.context';
import { ProtectedRoutes, PublicRoutes } from './routes';

function App() {
  const { state: { loggedIn } } = useGlobalContext();

  if (loggedIn) {
    return <ProtectedRoutes />
  }
  return <PublicRoutes />
}


export default App;
