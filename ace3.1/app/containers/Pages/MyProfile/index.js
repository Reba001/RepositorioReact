import React from 'react';
import clsx from 'clsx';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import dummy from './../../../api/dummy/dummyContents';
import { MyComponent } from './../../../api/dummy/dummyContents';
import { MyComponentRefresh } from './../../../components/Sidebar/SidebarContent';
import axios from 'axios';
import { Apiurl } from './../../../services/apirest';
import Grid from '@material-ui/core/Grid';
import styles from './myProfileStyle-jss';
import './estilo.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Save from '@material-ui/icons/Save';

import photos from './../../../api/images/photos';
import avatarApi from './../../../api/images/avatars';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import 'date-fns';

const title = brand.name + ' - My Profile';
const description = brand.desc;
const MySwal = withReactContent(Swal)

const useStyles = makeStyles((theme) => ({
  root_: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1.4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root__: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardAnimation: {
    'animation': 'appear 500ms ease-out forwards'
  },
}));



class MyProfile extends React.Component {

  constructor(props) {
    super(props);
    this.ckickMe = this.ckickMe.bind(this);
    this.recarga = this.recarga.bind(this);
    this.CenteredGrid = this.CenteredGrid.bind(this);
  }

  state = {
    user: [],
    infoUser: []
  }



  async componentDidMount() {
    var currentUsername = localStorage.getItem('useranme');
    let url = Apiurl + "/infouser";
    const objectVar = { username: currentUsername };
    await axios.post(url, objectVar)
      .then(response => {
        this.setState({
          user: response.data
        })

        console.log(this.state.user);
        let urlCaracterisitca = Apiurl + "/infousercarac";
        const objectVarCaracterisitca = { id_usuario: response.data[0].id_usuario };
        axios.post(urlCaracterisitca, objectVarCaracterisitca)
          .then(resp => {
            this.setState({
              infoUser: resp.data
            })

            console.log(this.state.infoUser);
          }).catch(e => {
          });
      }).catch(error => {
      });
  }

  recarga() {
    //MyComponent();
    //MyComponentRefresh();
  }

  CenteredGrid() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const [values, setValues] = React.useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    });

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };


    const [selectedDate, setSelectedDate] = React.useState(new Date(localStorage.getItem('nac')));

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const handleBlur = (e) => {
      setSelectedDate(e.target.value);
    };

    return (
      <div className={classes.root_, classes.cardAnimation}>
        {this.state.user.map((value, index) => {
          return (
            <Card className={classes.root, classes.paper, classes.cardAnimation} id="SpaceInCards" key={index}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {String(value.username).charAt(0).toUpperCase()}
                  </Avatar>
                }
                title={"Username: " + value.username}
                subheader={"Member since: " + (String(value.fecha_creacion).split('T'))[0]}
              />
            </Card>
          )
        })}

        <Grid container spacing={3} >
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              <div className={classes.root__}>
                <div>
                  {this.state.user.map((value, index) => {
                    return (
                      <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField, classes.cardAnimation)} key={index}>
                        <Input
                          id="name"
                          required
                          autoComplete="off"
                          defaultValue={value.nombre}
                          onChange={handleChange('name')}
                          inputProps={{
                            'aria-label': 'Name',
                          }}
                        />
                        <FormHelperText id="standard-name-helper-text">Name*</FormHelperText>
                      </FormControl>
                    )
                  })}

                  {this.state.user.map((value, index) => {
                    return (
                      <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField, classes.cardAnimation)} key={index}>
                        <Input
                          id="lastName"
                          required
                          autoComplete="off"
                          defaultValue={value.apellido}
                          onChange={handleChange('lastName')}
                          inputProps={{
                            'aria-label': 'lastName',
                          }}
                        />
                        <FormHelperText id="standard-lastName-helper-text">Last Name*</FormHelperText>
                      </FormControl>
                    )
                  })}

                  {this.state.user.map((value, index) => {
                    return (
                      <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField, classes.cardAnimation)} key={index}>
                        <div id="refresh">
                          <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <KeyboardDatePicker
                              margin="normal"
                              id="dateOfBirth"
                              format="MM/dd/yyyy"
                              //value={(String(value.fecha_nac).split("."))[0]}
                              value={selectedDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </MuiPickersUtilsProvider>
                          <FormHelperText id="standard-dateOfBirth-helper-text">Date Of Birth*</FormHelperText>
                        </div>
                      </FormControl>
                    )
                  })}

                  {this.state.infoUser.map((value, index) => {
                    return (
                      <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField, classes.cardAnimation)} key={index}>
                        <Input
                          id="age"
                          required
                          autoComplete="off"
                          defaultValue={value.edad}
                          onChange={handleChange('age')}
                          endAdornment={<InputAdornment className={classes.lineHeight} position="end">year(s)</InputAdornment>}
                          aria-describedby="standard-age-helper-text"
                          inputProps={{
                            'aria-label': 'age',
                          }}
                        />
                        <FormHelperText id="standard-age-helper-text">Age</FormHelperText>
                      </FormControl>
                    )
                  })}

                  {this.state.infoUser.map((value, index) => {
                    return (
                      <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField, classes.cardAnimation)} key={index}>
                        <div id="refresSelect">
                          <Select
                            id="sex"
                            defaultValue={value.sexo}
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'Without label' }}
                          >
                            <MenuItem value="Masculino">Masculino</MenuItem>
                            <MenuItem value="Femenino">Femenino</MenuItem>
                          </Select>
                          <FormHelperText>Gender</FormHelperText>
                        </div>
                      </FormControl>
                    )
                  })}

                  {this.state.infoUser.map((value, index) => {
                    return (
                      <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField, classes.cardAnimation)} key={index}>
                        <Input
                          id="weight"
                          required
                          autoComplete="off"
                          defaultValue={value.peso}
                          onChange={handleChange('weight')}
                          endAdornment={<InputAdornment className={classes.lineHeight} position="end">Kg</InputAdornment>}
                          aria-describedby="standard-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                        />
                        <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText>
                      </FormControl>
                    )
                  })}

                  {this.state.infoUser.map((value, index) => {
                    return (
                      <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField, classes.cardAnimation)} key={index}>
                        <Input
                          id="height"
                          required
                          autoComplete="off"
                          defaultValue={value.estatura}
                          onChange={handleChange('height')}
                          endAdornment={<InputAdornment className={classes.lineHeight} position="end">m</InputAdornment>}
                          aria-describedby="standard-weight-helper-text"
                          inputProps={{
                            'aria-label': 'height',
                          }}
                        />
                        <FormHelperText id="standard-height-helper-text">Height</FormHelperText>
                      </FormControl>
                    )
                  })}

                  {this.state.infoUser.map((value, index) => {
                    return (
                      <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField, classes.cardAnimation)} key={index}>
                        <Input
                          id="address"
                          required
                          autoComplete="off"
                          defaultValue={value.direccion}
                          onChange={handleChange('address')}
                          inputProps={{
                            'aria-label': 'address',
                          }}
                        />
                        <FormHelperText id="standard-address-helper-text">Address</FormHelperText>
                      </FormControl>
                    )
                  })}

                  {this.state.infoUser.map((value, index) => {
                    return (
                      <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField, classes.cardAnimation)} key={index}>
                        <Input
                          id="telephone"
                          required
                          autoComplete="off"
                          defaultValue={value.telefono}
                          onChange={handleChange('telephone')}
                          inputProps={{
                            'aria-label': 'telephone',
                          }}
                        />
                        <FormHelperText id="standard-telephone-helper-text">Telephone</FormHelperText>
                      </FormControl>
                    )
                  })}

                  <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField, classes.cardAnimation)}>
                    <Button onClick={this.ckickMe} className={classes.button} variant="contained" size="small" id="greenColor">
                      <Save className={classNames(classes.leftIcon, classes.iconSmall)} />
                      Save
                    </Button>
                  </FormControl>

                </div>
              </div>

            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }


  async ckickMe() {
    if (document.getElementById('name').value == "" || document.getElementById('lastName').value == "" || document.getElementById('dateOfBirth').value == "") {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'warning',
        title: 'Fill required fields (*).'
      })
    } else {
      let url = Apiurl + "/editarusuario";
      var dateSplit = (document.getElementById('dateOfBirth').value).split('/');

      const objectVar = {
        id_usuario: dummy.user.iduser,
        nombre: document.getElementById('name').value,
        apellido: document.getElementById('lastName').value,
        fecha_nac: dateSplit[2] + "-" + dateSplit[0] + "-" + dateSplit[1],
        edad: document.getElementById('age').value,
        sexo: document.getElementsByClassName('MuiSelect-nativeInput')[0].value,
        peso: document.getElementById('weight').value,
        estatura: document.getElementById('height').value,
        direccion: document.getElementById('address').value,
        telefono: document.getElementById('telephone').value
      };

      console.log(objectVar);
      await axios.post(url, objectVar)
        .then(response => {
          if (String(JSON.parse(response.data[0].consulta).status) == "ok ") {
            localStorage.setItem('nac', dateSplit[2] + "-" + dateSplit[0] + "-" + dateSplit[1] + "T00:00:00")
            document.getElementById('setName').innerText = document.getElementById('name').value.split(" ", 1) + " " + document.getElementById('lastName').value.split(" ", 1);;
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: 'Correctly edited data.'
            })
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'error',
              title: 'An error has occurred.'
            })
          }
        }).catch(error => {
          console.log(String(error));
        });
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <this.CenteredGrid />
      </div>
    );
  }
}

/*function MyProfile() {
  const title = brand.name + ' - My Profile';
  const description = brand.desc;
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock title="My Profile" desc="Some text description of My Profile">
        Content of My Profile
      </PapperBlock>
    </div>
  );
}*/

//export default MyProfile;

//export default withStyles(styles)(MyProfile);

export default MyProfile;