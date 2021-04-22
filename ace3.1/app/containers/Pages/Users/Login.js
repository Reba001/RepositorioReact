import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';

// service
import { Apiurl } from './../../../services/apirest';
import axios from 'axios';
import shake from './Shake';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

var errorMsg;

function Login(props) {
  const [valueForm, setValueForm] = useState(null);
  const submitForm = async values => {
    let url = Apiurl + "/login";
    let username = values._root.entries[0];
    let password = values._root.entries[1];
    let form = { "username": username[1], "password": password[1] };
    await axios.post(url, form)
      .then(response => {
        if (JSON.parse(response.data[0].consulta).status === "ok") {
          localStorage.setItem("useranme", document.getElementById("username").value);
          localStorage.setItem("esCoach", JSON.parse(response.data[0].consulta).es_coach);
          window.location.href = '/app';
        } else {
          if (JSON.parse(response.data[0].consulta).message == "Usuario no Existe") {
            var eusername = document.getElementById('eUsername');
            eusername.style.display = "block";
            const padre = document.getElementById('username').parentNode;
            padre.setAttribute("id", "envoltorioUsername");
            const ecopyusername = document.querySelector('#envoltorioUsername');
            ecopyusername.style.border = "1px solid red";
            shake(ecopyusername);
          }
          if (JSON.parse(response.data[0].consulta).message == "Password no coincide") {
            const epassword = document.getElementById('ePassword');
            epassword.style.display = "block";
            const padre = document.getElementById('pass').parentNode;
            padre.setAttribute("id", "envoltorioPassword");
            const ecopypass = document.querySelector('#envoltorioPassword');
            ecopypass.style.border = "1px solid red";
            shake(ecopypass);
          }
        }
      }).catch(error => {
        errorMsg = String(error);
        handleClick();
      })
  };

  const title = brand.name + ' - Login';
  const description = brand.desc;
  const { classes } = props;

  ///
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  ///
  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <LoginForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
        <Alert onClose={handleClose} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
