//Librairies
import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import fire from "../firebase";
//CSS
import "./App.scss";
//Composants
import Connexion from "../Components/Login/Connexion/Connexion";
import Inscription from "../Components/Login/Inscription/Inscription";
import Forget from "../Components/Login/Forget/Forget";
import ToggleBtn from "../Components/Login/ToggleBtn/ToggleBtn";
import PwaButton from "../Components/PwaButton/PwaButton";
//import Calendar from '../Components/Calendar/Calendar';
//import Home from '../Components/Home/Home';

function App() {
  //useState
  const [user, setUser] = useState(null);

  //Lazy Mode
  const Home = lazy(() => import("../Components/Home/Home"));
  const Calendar = lazy(() => import("../Components/Calendar/Calendar"));

  //DidMount
  useEffect(() => authListener(), []);

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ToggleBtn />
        <PwaButton />
        <Suspense fallback={<h1 className="loading">Chargement...</h1>}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (user ? <Calendar user={user} /> : <Home />)}
            />
            <Route
              exact
              path="/calendar"
              render={() => (user ? <Calendar user={user} /> : <Home />)}
            />
            <Route exact path="/connexion" component={Connexion} />
            <Route exact path="/inscription" component={Inscription} />
            <Route exact path="/forget" component={Forget} />
            <Route component={Home} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
