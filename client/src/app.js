import React from "react";
import Homepage from './pages/Home/homepage';
import Profile from './pages/profile/profile';
import Login from './pages/Login/login';
import Register from './pages/Register/register';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom" ; 

export default function App() {
  return (
   <Router>
     <Switch>
       <Route exact path="/">
         <Homepage></Homepage>
       </Route>

       <Route path="/login">
         <Login></Login>

       </Route>

       <Route path="/register">
         <Register></Register>
       </Route>

       <Route path="/profile/:username">
         <Profile></Profile>
       </Route>

     </Switch>
   </Router>
  );
}