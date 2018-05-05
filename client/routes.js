//client/routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import FourOhFour from './components/utility/FourOhFour';

export const Routes = () => (
    <Switch>
      <Route exact path='/' component={App} />
      <Route component={FourOhFour} />
    </Switch>
);

export default Routes;