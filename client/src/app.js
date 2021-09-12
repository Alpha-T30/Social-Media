import React, { useContext } from "react";
import Homepage from "./pages/Home/homepage";
import Profile from "./pages/profile/profile";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";

import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

import axios from 'axios'; 



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default function App() {
  const { user } = useContext(AuthContext);

  

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Homepage /> : <Login />}
        </Route>

        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>

        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>

        <Route path="/profile/:username">
          <Profile></Profile>
        </Route>
      </Switch>
    </Router>
  );
}
