import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Contacts from './pages/Contacts';
import NewContact from './pages/NewContact'
import EditContact from './pages/EditContact'



export default function Routes(){

  // function loggedIn(){
  //   const username = localStorage.getItem('user');
  //   if (username !== '') {
  //     const loggedIn = true
  //   }
  //   console.log(loggedIn)
  // }

  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        {/* <Route path="/register">
          {loggedIn ? <Register /> : <Redirect to="/"/>}
        </Route> */}
        <Route path="/register" exact component={Register} />
        <Route path="/contacts" exact component={Contacts} />
        <Route path="/contacts/new" component={NewContact} />
        <Route path="/contacts/new" component={NewContact} />
        <Route path="/contacts/:id" component={EditContact} />
      </Switch>
    </BrowserRouter>
  )
}