//Librairies
import React, { useState, useEffect } from 'react';
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
import { useTheme } from '../Context/Context';

export default function App() {
  const [user, setUser] = useState(null);

  const { theme } = useTheme();

  //DidMount
  useEffect(() => authListener(), []);

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else setUser(null);
    });
  };

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
          <Route component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
