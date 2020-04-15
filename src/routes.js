import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Contacts from './pages/Contacts';
import NewContact from './pages/NewContact'
import EditContact from './pages/EditContact'



export default function Routes(){

  const loggedIn = !!localStorage.getItem('user')
  
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/contacts" exact>
          {loggedIn ? <Contacts /> : <Redirect to="/"/>}
        </Route>
        <Route path="/contacts/new">
          {loggedIn ? <NewContact /> : <Redirect to="/"/>}
        </Route>
        <Route path="/contacts/:id">
          {loggedIn ? <EditContact /> : <Redirect to="/"/>}
        </Route>
      </Switch>
    </BrowserRouter>
  )
}