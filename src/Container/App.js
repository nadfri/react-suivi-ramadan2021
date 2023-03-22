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

/*Wallpapers*/
import wallpaper0 from '../wallpapers/wallpaper.webp';
import wallpaper1 from '../wallpapers/wallpaper1.webp';
import wallpaper2 from '../wallpapers/wallpaper2.webp';
import wallpaper3 from '../wallpapers/wallpaper3.webp';
import wallpaper4 from '../wallpapers/wallpaper4.webp';
import wallpaper5 from '../wallpapers/wallpaper5.webp';
import wallpaper6 from '../wallpapers/wallpaper6.webp';

const wallpapers = {
  wallpaper0,
  wallpaper1,
  wallpaper2,
  wallpaper3,
  wallpaper4,
  wallpaper5,
  wallpaper6,
};

export default function App() {
  const localWallpaper = localStorage.getItem('wallpaper');
  //useState
  const [user, setUser] = useState(null);
  const [wallpaper, setWallpaper] = useState(localWallpaper || 'wallpaper0');

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
    <div className='App' style={{ backgroundImage: `url(${wallpapers[wallpaper]})` }}>
      <BrowserRouter>
        <ToggleBtn />
        <PwaButton />

        <Switch>
          <Route
            exact
            path='/'
            render={() =>
              user ? (
                <Calendar user={user} setWallpaper={setWallpaper} wallpaper={wallpaper} />
              ) : (
                <Home />
              )
            }
          />
          <Route
            exact
            path='/calendar'
            render={() =>
              user ? (
                <Calendar user={user} setWallpaper={setWallpaper} wallpaper={wallpaper} />
              ) : (
                <Home />
              )
            }
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
