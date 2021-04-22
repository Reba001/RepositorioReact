import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Auth from './Auth';
import Application from './Application';
import LoginDedicated from '../Pages/Standalone/LoginDedicated';
import ThemeWrapper from './ThemeWrapper';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App() {
  return (
    <ThemeWrapper>
      <Switch>
        <Route path="/" exact render={props => (<LoginDedicated {...props} />)} />
        <Route path="/app" component={Application} />
        <Route component={Auth} />
        <Route component={NotFound} />
      </Switch>
    </ThemeWrapper>
  );
}
//component={LoginDedicated}
export default App;
