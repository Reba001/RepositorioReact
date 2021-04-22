import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AllInclusive from '@material-ui/icons/AllInclusive';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import RestoreIcon from '@material-ui/icons/Restore';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SpeedIcon from '@material-ui/icons/Speed';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import Brightness5 from '@material-ui/icons/Brightness5';
import People from '@material-ui/icons/People';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import { TextFieldRedux, CheckboxRedux } from './ReduxFormMUI';
import styles from './user-jss';
import { ContentDivider } from '../Divider';
import Tooltip from '@material-ui/core/Tooltip';
import './estilo.css'

// validation functions
const required = value => (value === null ? 'Required' : undefined);
/*const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);*/

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});


function handleChange(e) {
  if (e.target.id === "username") {
    var eusername = document.getElementById('eUsername');
    eusername.style.display = "none";
    const ecopyusername = document.querySelector('#envoltorioUsername');
    if (ecopyusername) {
      ecopyusername.style.border = "1px solid rgba(0,0,0,0.32)";
    }
  }

  if (e.target.id === "pass") {
    const epassword = document.getElementById('ePassword');
    epassword.style.display = "none";
    const ecopypassword = document.querySelector('#envoltorioPassword');
    if (ecopypassword) {
      ecopypassword.style.border = "1px solid rgba(0,0,0,0.32)";
    }
  }
}

function LoginForm(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(show => !show);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const {
    classes,
    handleSubmit,
    pristine,
    submitting,
    deco,
  } = props;
  return (
    <Fragment>
      <Hidden mdUp>
        <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink>
      </Hidden>
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <Hidden smDown>
          <div className={classes.topBar}>
            <NavLink to="/" className={classes.brand}>
              <img src={logo} alt={brand.name} />
              {brand.name}
            </NavLink>
            <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/register">
              <Icon className={classes.icon}>arrow_forward</Icon>
              Create new account
            </Button>
          </div>
        </Hidden>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Sign In
        </Typography>
        <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
          Put intelligence in the management of your vital signs.
        </Typography>
        <section className={classes.socmedLogin}>
          <div>
            <Tooltip title="Heart rate" placement="top" arrow>
              <FavoriteIcon className={classNames(classes.iconSmall, classes.redBtn, classes.spaceFuction, "hand")} />
            </Tooltip>
            <Tooltip title="Body temperature" placement="top" arrow>
              <WhatshotIcon className={classNames(classes.iconSmall, classes.blueBtn, classes.spaceFuction, "hand")} />
            </Tooltip>
            <Tooltip title="Timer beep" placement="top" arrow>
              <NotificationsActiveIcon className={classNames(classes.iconSmall, classes.cyanBtn, classes.spaceFuction, "hand")} />
            </Tooltip>
            <Tooltip title="Repetition counter" placement="top" arrow>
              <RestoreIcon className={classNames(classes.iconSmall, classes.greenBtn, classes.spaceFuction, "hand")} />
            </Tooltip>
            <Tooltip title="Speed ​​measurement" placement="top" arrow>
              <SpeedIcon className={classNames(classes.iconSmall, classes.orangeBtn, classes.spaceFuction, "hand")} />
            </Tooltip>
            <Tooltip title="Distance measurement" placement="top" arrow>
              <TransferWithinAStationIcon className={classNames(classes.iconSmall, classes.yellowBtn, classes.spaceFuction, "hand")} />
            </Tooltip>
            <Tooltip title="Surrender indicator" placement="top" arrow>
              <SentimentVeryDissatisfiedIcon className={classNames(classes.iconSmall, classes.spaceFuction, "hand")} />
            </Tooltip>
            <Tooltip title="Test failure indicator" placement="top" arrow>
              <TimerOffIcon className={classNames(classes.iconSmall, classes.oliveBtn, "hand")} />
            </Tooltip>
          </div>
          <ContentDivider content="Application functionalities" />
        </section>
        <section className={classes.formWrap}>
          <form onSubmit={handleSubmit}>
            <div id="afuera">
              <FormControl className={classes.formControl} id="adentro" onChange={handleChange}>
                <Field
                  name="email"
                  id="username"
                  component={TextFieldRedux}
                  placeholder="Your UserName"
                  label="Your UserName"
                  required
                  validate={required}
                  autoComplete="new-password"
                  /*validate={[required, email]}*/
                  className={classes.field}
                />
                <span className="errorUsername" id="eUsername">The username does not exist.</span>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl} onChange={handleChange}>
                <Field
                  name="password"
                  id="pass"
                  component={TextFieldRedux}
                  type={showPassword ? 'text' : 'password'}
                  label="Your Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  required
                  validate={required}
                  className={classes.field}
                />
                <span className="errorPassword" id="ePassword">Password is incorrect.</span>
              </FormControl>
            </div>
            <div className={classes.optArea}>
              <FormControlLabel className={classes.label} control={<Field name="checkbox" component={CheckboxRedux} />} label="Remember" />
              <Button size="small" component={LinkBtn} to="/reset-password" className={classes.buttonLink}>Forgot Password</Button>
            </div>
            <div className={classes.btnArea}>
              <Button variant="contained" color="primary" size="large" type="submit">
                Continue
                <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    </Fragment>
  );
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const LoginFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(LoginForm);

const reducerLogin = 'login';
const reducerUi = 'ui';
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducerLogin, 'usersLogin']),
    deco: state.getIn([reducerUi, 'decoration'])
  }),
)(LoginFormReduxed);

export default withStyles(styles)(FormInit);
