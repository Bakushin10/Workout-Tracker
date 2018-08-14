//client/routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Tracker from './components/App';
import Home from './components/Home';
import Update from './components/Update';
import Result from './components/Result';
import FourOhFour from './components/utility/FourOhFour';

export const Routes = () => (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/Tracker' component={Tracker} />
      <Route path='/Update' component={Update} />
      <Route path='/Result' component={Result} />
      <Route component={FourOhFour} />
    </Switch>
);

export default Routes;