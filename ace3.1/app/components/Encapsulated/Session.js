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
import SessionGraph from './../Encapsulated/SessionGraph';
import SessionMoreData from './../Encapsulated/SessionMoreData';
import Icon from '@material-ui/core/Icon';
import { PapperBlock } from 'dan-components';
import './tabla.css';

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

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

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
});

function AdvFilter(props) {
    // inicio modal 2
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');

    const handleClickOpen = (e) => {
        localStorage.setItem("id_session",e);
        setOpen(true);
    };

    const handleClose = () => {
        localStorage.removeItem("id_session");
        setOpen(false);
    };
    // end modal 2

    const [msg, setMsg] = useState([]);

    const getMsg = async () => {
        try {
            let url = Apiurl + "/miavma";
            const currentIdCouch = localStorage.getItem('idUsuarioLogin');
            const objectVar = { id_usuario: currentIdCouch };
            await axios.post(url, objectVar).then(data => {
                console.log(data);
                const result = [];
                var contador = 0;
                var idSessionActual = 0;
                var idSessionGuardado = 0;
                data.data.forEach(item => {
                    idSessionActual = item.sesion;
                    if (idSessionGuardado != idSessionActual) {
                        result[contador] = [document.getElementById('setName').innerText, localStorage.getItem('useranme'), item.sesion, (String(item.fecha).split(' '))[0], item.sesion];
                        contador++;
                    }
                    idSessionGuardado = idSessionActual;
                });
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
                filter: true,

            }
        },
        {
            name: 'Nickname',
            options: {
                filter: true
            }
        },
        {
            name: 'Session',
            options: {
                filter: true
            }
        },
        {
            name: 'Test date',
            options: {
                filter: true
            }
        },
        {
            name: 'Report',
            options: {
                filter: false,
                customBodyRender: (value) => (
                    < Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={< Icon > send</Icon>}

                        onClick={(e) => handleClickOpen(value, e)}
                    >
                        View test results
                    </Button >
                )
            }
        },
    ];

    const options = {
        filterType: 'dropdown',
        responsive: 'stacked',
        fixedHeader: true,
        elevation: 0,
        rowsPerPage: 10,
        page: 0,
        selectableRows: false
    };

    function d(asd) {
        var newArray = [];
        for (var i = 0; i < asd.length; i++) {
            if (asd[i] === undefined) {

            } else {
                newArray.push(asd[i]);
            }
        }
        return newArray;
    }

    const { classes } = props;
    const classes_ = useStyles();
    //const { open, scroll } = state;

    return (
        <div className={classes.table}>
            <PapperBlock title="Final report of the tests" desc="By clicking on the report you will be able to see the graph of the test and other important data">
                <MuiThemeProvider theme={myTheme}>
                    <MUIDataTable className="mitabla"
                        data={d(msg)}
                        columns={columns}
                        options={options}
                    />
                </MuiThemeProvider>
            </PapperBlock>

            {/* modal */}
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Final test graph</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={7} className={classes_.cardAnimation}>
                            <SessionGraph />
                        </Grid>
                        <Grid item xs={12} sm={5} className={classes_.cardAnimation}>
                            <SessionMoreData />
                        </Grid>
                    </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            {/* end modal */}

        </div>
    );
}

AdvFilter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvFilter);

const myTheme = createMuiTheme({
    overrides: {
        MUIDataTable: {
            responsiveScroll: {
                maxHeight: "580px"
                // overflowY: 'scroll',
            }
        }
    }
});