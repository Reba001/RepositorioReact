import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import { Apiurl } from './../../services/apirest';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import FileUpload from '@material-ui/icons/CloudUpload';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from '@material-ui/core/Tooltip';

import CloseIcon from '@material-ui/icons/Close';

import HeartRateGauge from './../Encapsulated/HeartRateGauge';
import BodyTemperatureGauge from './../Encapsulated/BodyTemperatureGauge';
import SpeedReached from './../Encapsulated/SpeedReached';
import DistanceMeasuredByRepetition from './../Encapsulated/DistanceMeasuredByRepetition';
import CountOfTimesTheAthleteHasFailed from './../Encapsulated/CountOfTimesTheAthleteHasFailed';
import CountOfTimesTheAthleteHasGivenUp from './../Encapsulated/CountOfTimesTheAthleteHasGivenUp';
import DateOfDay from './../Encapsulated/DateOfDay';
import RepetitionCountByDate from './../Encapsulated/RepetitionCountByDate';
import GeneralHistory from './../Encapsulated/GeneralHistory';
import LastHeartRateMeasurement from './../Encapsulated/LastHeartRateMeasurement';
import LastTemperatureMeasurement from './../Encapsulated/LastTemperatureMeasurement';
import AverageTemperature from './../Encapsulated/AverageTemperature';
import AverageHeartRate from './../Encapsulated/AverageHeartRate';
import CurrentTemperature from './../Encapsulated/CurrentTemperature';
import CurrentHeartRate from './../Encapsulated/CurrentHeartRate';

import ComponentTest from './../Encapsulated/ComponentTest';

import Icon from '@material-ui/core/Icon';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './style.css';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    Divider,
    Grid,
    AppBar,
    Toolbar,
    Typography,
    Slide,
} from '@material-ui/core';

const styles_ = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '1%',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    izq: {
        'float': 'right'
    },
    myButton: {
        fontSize: '10px'
    },
    post: {
        textAlign: 'center',
        'font-weight': '600',
        'text-align': 'center',
        'font-weight': '600',
        'font-size': '16px',
        'padding-top': '16px'
    },
    post1: {
        'font-weight': '600',
        'text-align': 'center',
        'font-size': '14px',
        'padding-top': '0px'
    },
    post2: {
        'font-weight': '600',
        'text-align': 'center',
        'font-size': '12px'
    },
    postCard: {
        textAlign: 'center',
        'font-size': '14px',
    },
    btnSize: {
        'font-size': '0.6rem !important'
    },
    cardAnimation: {
        'animation': 'appear 500ms ease-out forwards'
    },
}));

const styles = theme => ({
    table: {
        '& > div': {
            overflow: 'auto'
        },
        '& table': {
            '& td': {
                wordBreak: 'keep-all'
            },
            [theme.breakpoints.down('md')]: {
                '& td': {
                    height: 60,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }
            }
        }
    },
    redBtn: {
        color: '#f44336',
        'border-color': '#f44336'
    },
    blueBtn: {
        color: '#7986cb',
        'border-color': '#7986cb'
    },
    blackBtn: {
        color: '#000000',
        'border-color': '#000000'
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
});

function AdvFilter(props) {

    // modal dashboard
    const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const [state, setState] = React.useState({
        open: false
    });

    const handleClickOpen = (e) => {
        localStorage.setItem("idUsuarioLog", localStorage.getItem("idUsuarioLogin"));
        localStorage.removeItem("idUsuarioLogin");
        localStorage.setItem("idUsuarioLogin", e);
        console.log(e);
        setState({ open: true });
        if (document.getElementById("dialog")) {
            var diag = document.getElementById('dialog');
            diag.style.zIndex = 1300;
        }
    };

    const handleClose = () => {
        localStorage.removeItem("idUsuarioLogin");
        localStorage.setItem("idUsuarioLogin", localStorage.getItem("idUsuarioLog"));
        localStorage.removeItem("idUsuarioLog");
        setState({ open: false });
        var diag = document.getElementById('dialog');
        diag.style.zIndex = 0;
    };
    // end modal dashboard

    const [msg, setMsg] = useState([]);

    const getMsg = async () => {
        try {
            let url = Apiurl + "/misatletas";
            const currentIdCouch = localStorage.getItem('idUsuarioLogin');
            const objectVar = { id: currentIdCouch };
            await axios.post(url, objectVar).then(data => {
                console.log(data);
                const result = [];
                data.data.forEach(item => {
                    result[item.id_usuario] = [item.username, item.nombre, item.apellido, (String(item.fecha_nac).split('T'))[0], item.id_usuario];
                });
                //console.log(result);
                setMsg(result);
            });
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getMsg();
    }, [])


    const columns = [
        {
            name: 'Username',
            options: {
                filter: true
            }
        },
        {
            name: 'Name',
            options: {
                filter: true
            }
        },
        {
            name: 'Surname',
            options: {
                filter: true
            }
        },
        {
            name: 'Date of Birth',
            options: {
                filter: true
            }
        },
        {
            name: 'Measurements',
            options: {
                filter: false,
                customBodyRender: (value) => (
                    <label htmlFor="icon-button-file">
                        <Tooltip title="Heart rate" placement="top" arrow>
                            <IconButton color="primary" id={"HeartRateGauge" + value} name={value} className={classes.button} component="span">
                                <FavoriteIcon className={classes.redBtn} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Body temperature" placement="top" arrow>
                            <IconButton color="primary" id={"BodyTemperature" + value} name={value} className={classes.button} component="span" onClick={handleClickOpen}>
                                <WhatshotIcon className={classes.blueBtn} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Athlete Dashboard" placement="top" arrow>
                            <IconButton color="primary" id={"Dahsboard" + value} name={value} className={classes.button} component="span" onClick={(e) => handleClickOpen(value, e)}>
                                <HomeIcon className={classes.blackBtn} />
                            </IconButton>
                        </Tooltip>
                    </label>
                )
            }
        },
    ];

    const options = {
        filterType: 'dropdown',
        responsive: 'stacked',
        rowsPerPage: 10,
        page: 0
    };

    function d(asd) {
        var newArray = [];
        for (var i = 0; i < asd.length; i++) {
            if (asd[i] === undefined) {

            } else {
                newArray.push(asd[i]);
            }
        }
        //console.log(newArray);
        return newArray;
    }

    const { classes } = props;
    const classes_ = useStyles();

    return (
        <div className={classes_.root}>
            <Grid container spacing={3}>
               {/* <Grid item xs={12} sm={3} >
                    <Card className={classes.root, classes_.cardAnimation} id="glass">
                        <CardActionArea>

                            <Typography variant="h5" component="h4" className={classes_.post}>
                                Heart rate
                                </Typography>
                            <Typography variant="h5" component="h4" className={classes_.post2}>
                                Last measurement: <LastHeartRateMeasurement />

                            </Typography>
                            <CardContent>

                                <HeartRateGauge />
                                <div className={classes_.root}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6} className={classes_.postCard}>
                                            <AverageHeartRate /> bpm
                                                            <br />
                                                            AVERAGE
                                        </Grid>
                                        <Grid item xs={12} sm={6} className={classes_.postCard}>
                                            <CurrentHeartRate /> bpm
                                                            <br />
                                                            CURRENT
                                        </Grid>
                                    </Grid>
                                </div>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className={classes_.izq}>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                className={classes_.btnSize}
                            >
                                More info
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                className={classes_.btnSize}
                            >
                                Reports
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                 <Grid item xs={12} sm={3} >
                    <Card className={classes.root, classes_.cardAnimation} id="glass">
                        <CardActionArea>

                            <Typography variant="h5" component="h4" className={classes_.post}>
                                Body Temperature
                                </Typography>
                            <Typography variant="h5" component="h4" className={classes_.post2}>
                                Last measurement: <LastTemperatureMeasurement />

                            </Typography>
                            <CardContent>

                                <BodyTemperatureGauge />
                                <div className={classes_.root}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6} className={classes_.postCard}>
                                            <AverageTemperature /> °C
                                                            <br />
                                                            AVERAGE
                                        </Grid>
                                        <Grid item xs={12} sm={6} className={classes_.postCard}>
                                            <CurrentTemperature /> °C
                                                            <br />
                                                            CURRENT
                                        </Grid>
                                    </Grid>
                                </div>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className={classes_.izq}>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                className={classes_.btnSize}
                            >
                                More info
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                className={classes_.btnSize}
                            >
                                Reports
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                
               < Grid item xs={12} sm={6} className={classes_.cardAnimation}>
                    <Paper className={classes_.paper}>
                        <Typography variant="h5" component="h4" className={classes_.post1}>
                            General History
                                            </Typography>
                        <GeneralHistory />
                    </Paper>
                </Grid>
                
                <Grid item xs={12} sm={9}>
                    <Card className={classes.root}>
                        <SpeedReached />
                    </Card>
                </Grid>
                */}

                <Grid item xs={12} sm={12}>
                    <Card className={classes.root}>
                        <ComponentTest />
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CountOfTimesTheAthleteHasFailed />

                </Grid>
                <Grid item xs={12} sm={6}>
                    <CountOfTimesTheAthleteHasGivenUp />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Card className={classes.root}>
                        <DistanceMeasuredByRepetition />
                    </Card>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Card className={classes.root}>
                        <RepetitionCountByDate />
                    </Card>
                </Grid>
            </Grid>
        </div>

    );
}

AdvFilter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvFilter);