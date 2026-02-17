//Librairies
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import fire from '../firebase';

//CSS
import './App.scss';
//Composants
import Connexion from '../Components/Login/Connexion/Connexion';
import Inscription from '../Components/Login/Inscription/Inscription';
import Forget from '../Components/Login/Forget/Forget';
import ToggleBtn from '../Components/Login/ToggleBtn/ToggleBtn';
import PwaButton from '../Components/PwaButton/PwaButton';
import Calendar from '../Components/Calendar/Calendar';
import History from '../Components/Calendar/History/History';
import Home from '../Components/Home/Home';
import Admin from '../Components/Admin/Admin';
import NotFound from '../Components/NotFound/NotFound';
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoute';
import { useTheme } from '../Context/Context';
import Loader from '../Components/Loader/Loader';
import ErrorBoundary from '../Components/ErrorBoundary/ErrorBoundary';

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const { theme } = useTheme();

  //DidMount
  useEffect(() => authListener(), []);

  // ✅ Mise à jour automatique de la PWA sans intervention utilisateur
  useEffect(() => {
    let refreshing = false;
    // On écoute le changement de contrôleur (nouveau SW activé)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      // On recharge pour charger les nouveaux assets immédiatement
      window.location.reload();
    });
  }, []);

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      setUser(user || null);
      setAuthLoading(false);
    });
  };

  if (authLoading) {
    return <Loader />;
  }

  return (
    <ErrorBoundary>
      <div className={`App ${theme.id}`} style={{ backgroundImage: `url(${theme.src})` }}>
        <BrowserRouter>
          <ToggleBtn />
          <PwaButton />

          <Switch>
            <Route
              exact
              path='/'
              render={() => (user ? <Calendar user={user} /> : <Home />)}
            />
            <Route
              exact
              path='/calendar'
              render={() => (user ? <Calendar user={user} /> : <Home />)}
            />
            <Route
              exact
              path='/historic'
              render={() => (user ? <History user={user} /> : <Home />)}
            />
            <Route exact path='/connexion' component={Connexion} />
            <Route exact path='/inscription' component={Inscription} />
            <Route exact path='/forget' component={Forget} />

            {/* Route Admin protégée */}
            <ProtectedRoute exact path='/admin' component={Admin} user={user} />

            {/* Route 404 */}
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}
