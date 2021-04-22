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

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import GeneralHistory from './../Encapsulated/GeneralHistory';
import LastHeartRateMeasurement from './../Encapsulated/LastHeartRateMeasurement';
import LastTemperatureMeasurement from './../Encapsulated/LastTemperatureMeasurement';
import AverageTemperature from './../Encapsulated/AverageTemperature';
import AverageHeartRate from './../Encapsulated/AverageHeartRate';
import CurrentTemperature from './../Encapsulated/CurrentTemperature';
import CurrentHeartRate from './../Encapsulated/CurrentHeartRate';

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
        paddingTop: '1%'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    izq: {
        'float': 'right'
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
    button: {
        margin: theme.spacing(0),
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
        localStorage.setItem("idUsuarioLogin",e);
        console.log(e);
        setState({ open: true });
        if (document.getElementById("dialog")) {
            var diag = document.getElementById('dialog');
            diag.style.zIndex = 1300;
        }
    };

    const handleClose = () => {
        localStorage.removeItem("idUsuarioLogin");
        localStorage.setItem("idUsuarioLogin",localStorage.getItem("idUsuarioLog"));
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
                            <IconButton color="primary" id={"HeartRateGauge"+value} name={value} className={classes.button} component="span">
                                <FavoriteIcon className={classes.redBtn} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Body temperature" placement="top" arrow>
                            <IconButton color="primary" id={"BodyTemperature"+value} name={value} className={classes.button} component="span" onClick={handleClickOpen}>
                                <WhatshotIcon className={classes.blueBtn} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Athlete Dashboard" placement="top" arrow>
                            <IconButton color="primary" id={"Dahsboard"+value} name={value} className={classes.button} component="span" onClick={(e) =>handleClickOpen(value, e)}>
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
        <div className={classes.table}>
            <MUIDataTable
                title="Athlete list"
                data={d(msg)}
                columns={columns}
                options={options}
            />

            {/* dashboard modal */}
            <Dialog
                id="dialog"
                fullScreen
                open={state.open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            Athlete Dashboard
                        </Typography>
                        <DateOfDay />
                    </Toolbar>
                </AppBar>
                {/*<HeartRateGauge />*/}
                {/*<List>
                    <ListItem button>
                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                    </ListItem>
                </List>*/}
                <div className={classes_.root}>
                    <Grid container spacing={3}>
                        {/*<Grid item xs={12}>
                            <Paper className={classes_.paper}>xs=12</Paper>
                        </Grid>*/}
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes_.paper}>

                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image="https://invdes.com.mx/wp-content/uploads/2019/07/31-07-19-laser.jpg"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Heart rate
                                                <br />
                                                Last measurement: <LastHeartRateMeasurement />

                                            </Typography>
                                            <HeartRateGauge />
                                            <div className={classes_.root}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Paper className={classes_.paper}>
                                                           <AverageHeartRate /> bpm
                                                            <br />
                                                            AVERAGE
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Paper className={classes_.paper}>
                                                            <CurrentHeartRate /> bpm
                                                            <br />
                                                            CURRENT
                                                        </Paper>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions className={classes_.izq}>
                                        <Button size="small" color="primary">
                                            More information
                                        </Button>
                                        <Button size="small" color="primary">
                                            Reports
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes_.paper}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image="https://images.ctfassets.net/juauvlea4rbf/42w1xv0NleK6Qy24aqq4sg/33042821bee96c66552fbf1877c56039/What_is_BBT__contenful_2x-8.png?w=960&q=50"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                    Body Temperature
                                                    <br />
                                                    Last measurement: <LastTemperatureMeasurement />
                                                </Typography>
                                            <BodyTemperatureGauge />
                                            <div className={classes_.root}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Paper className={classes_.paper}>
                                                            <AverageTemperature />°C
                                                            <br />
                                                            AVERAGE
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Paper className={classes_.paper}>
                                                           <CurrentTemperature /> °C
                                                            <br />
                                                            CURRENT
                                                        </Paper>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions className={classes_.izq}>
                                        <Button size="small" color="primary">
                                            More information
                                            </Button>
                                        <Button size="small" color="primary">
                                            Reports
                                            </Button>
                                    </CardActions>
                                </Card>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Paper className={classes_.paper}>
                                <Card className={classes.root}>
                                    <SpeedReached />
                                </Card>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes_.paper}>
                                <CountOfTimesTheAthleteHasFailed />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes_.paper}>
                                <CountOfTimesTheAthleteHasGivenUp />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Paper className={classes_.paper}>
                                <Card className={classes.root}>
                                    <DistanceMeasuredByRepetition />
                                </Card>
                            </Paper>
                        </Grid>
                        
                        <Grid item xs={12} sm={9}>
                            <Paper className={classes_.paper}>
                                <Card className={classes.root}>
                                    <RepetitionCountByDate />
                                </Card>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Dialog>
            {/* end dashboard modal */}

        </div>
    );
}

AdvFilter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvFilter);