import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import { ThemeContext } from './ThemeWrapper';
//import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import ThemeWrapper from './ThemeWrapper';
import {
  Parent,
  DashboardPage,
  BlankPage,
  Form,
  Table,
  Error,
  AssignMeAthletes,
  NuevaPagina,
  MyAthletes,
  MyProfile,
  NotFound
} from '../pageListAsync';


function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  if (localStorage.getItem('useranme') != null && localStorage.getItem('esCoach') === '1') {
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          <Route exact path="/app" component={BlankPage} />
          <Route exact path="/app/assign-me-athletes" component={AssignMeAthletes} />
          <Route exact path="/app/my-athletes" component={MyAthletes} />
          <Route exact path="/app/my-profile" component={MyProfile} />

          <Route path="/app/dashboard" component={DashboardPage} />
          <Route path="/app/form" component={Form} />
          <Route path="/app/table" component={Table} />
          <Route path="/app/page-list" component={Parent} />
          <Route path="/app/pages/error" component={Error} />
          <Route component={NotFound} />
        </Switch>
      </Dashboard>
    );
  } else if (localStorage.getItem('useranme') != null && localStorage.getItem('esCoach') === '0') {
    //console.log(history);
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          <Route exact path="/app" component={BlankPage} />
          <Route path="/app/pages/error" component={Error} />
          <Route exact path="/app/my-profile" component={MyProfile} />

          <Route exact path="/app/my-profile1" component={NuevaPagina} />

          <Route component={NotFound} />
        </Switch>
      </Dashboard>
    );
  } else {
    window.location.href = '/';
  }
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
