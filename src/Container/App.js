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
import Home from '../Components/Home/Home';
import Admin from '../Components/Admin/Admin';
import NotFound from '../Components/NotFound/NotFound';
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoute';
import { useTheme } from '../Context/Context';
import Loader from '../Components/Loader/Loader';

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const { theme } = useTheme();

  //DidMount
  useEffect(() => authListener(), []);

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
  );
}
