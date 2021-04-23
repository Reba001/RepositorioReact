import React, { useEffect, useState } from "react";
import { Apiurl } from './../../services/apirest';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import './estilo.css';

import {
    Typography,
    Grid
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

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


const getIntroOfPage = (label) => {
    return 'Test No. ' + label;
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">Tiempo: {`${label}`} s</p>
                <p className="label">Dato medido: {`${payload[0].value}`} ml/kg/s</p>
                {/*<p className="intro">{getIntroOfPage(label)}</p>*/}
                {/*<p className="desc">Anything you want can be displayed here.</p>*/}
            </div>
        );
    }

    return null;
};

let url = Apiurl + "/historial";
const currentIdUsuario = localStorage.getItem('idUsuarioLogin');
const objectVar = {
    id_usuario: currentIdUsuario,
    id_medicion: "1",
    limit: "0"
};

var oneMax = 0;
var oneMin = 0;
function get(myVal) {
    useEffect(() => {
        const timeOut = setInterval(() => {
            getMsg();
        }, 500)
        getMsg();
        return () => {
            clearInterval(timeOut);
        }
    }, [])

    const getMsg = async () => {
        var contador = 0;
        var result = [];
        await axios.post(url, objectVar).
            then(data => {
                data.data.forEach(item => {
                    if (item.id_sesion == myVal) {
                        result[contador] = { valor: item.valor };
                        //resultAfuera[contador] = {valor: item.valor };
                        contador++;
                    }

                    if(myVal == 1){
                        localStorage.setItem("oneMax", Math.max(...result.map((i) => i.valor)));
                        localStorage.setItem("oneMin", Math.min(...result.map((i) => i.valor)));
                        //oneMax = Math.max(...result.map((i) => i.valor));
                        //oneMin = Math.min(...result.map((i) => i.valor));
                    }

                    if(myVal == 2){
                        localStorage.setItem("twoMax", Math.max(...result.map((i) => i.valor)));
                        localStorage.setItem("twoMin", Math.min(...result.map((i) => i.valor)));
                    }
                    //resultAfuera[contadorAfuera] = {id_sesion:item.id_sesion, valor: item.valor };
                    //contadorAfuera++;
                })

                setPoints(result);
            });
    }
    const [points, setPoints] = useState([]);
    return points;
}


function get2(myVal) {
    var contador = 0;
    var result = [];
    axios.post(url, objectVar).
        then(data => {
            data.data.forEach(item => {
                if (item.id_sesion == myVal) {
                    result[contador] = { valor: item.valor };
                    contador++;
                }
            })

            setPoints(result);
        });
    const [points, setPoints] = useState([]);
    return points;
}

function muestra(val) {
    //console.log(resultAfuera);
    
    /*var cont = 0;
    var array = [];
    resultAfuera.map((i) => {
        //if(i.id_sesion == val){
            console.log(i);
        //}
        //console.log(i.valor);

    });*/
    /*resultAfuera.data.forEach(item => {
        if (item.id_sesion == val) {
            array[cont] = { valor: item.valor };
            cont++;
        }
    });
    console.log(array);
    setPoints(array);
    const [points, setPoints] = useState([]);*/
    //const dataMax = Math.max(...resultAfuera.map((i) => i.valor));
    //const dataMin = Math.min(...resultAfuera.map((i) => i.valor));
    //xconsole.log(dataMax);

    //contadorAfuera = 0;
    //resultAfuera.length = 0;
    

    /*if (dataMax <= 0) {
        return 0;
    }
    if (dataMin >= 0) {
        return 1;
    }*/

    return 10;
    //return 10;
}

function forOne(){
    return localStorage.getItem("oneMax") / (localStorage.getItem("oneMax") - (localStorage.getItem("oneMin")));
    //return oneMax / (oneMax-(oneMin));
}

function forTwo(){
    return localStorage.getItem("twoMax") / (localStorage.getItem("twoMax") - (localStorage.getItem("twoMin")));
}

function App(props) {
    const { classes } = props;
    const classes_ = useStyles();
    return (
        <div className={classes_.root}>
            <Grid container spacing={3}>

                <Grid item xs={12} sm={6} className={classes_.cardAnimation} id="mione">
                    <Paper className={classes_.paper}>
                        <Typography variant="h5" component="h4" className={classes_.post1}>
                            Test No. 1
                        </Typography>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart width={500} height={400} data={get(1)} margin={{ top: 20, right: 50, left: 0, bottom: 20 }} >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <defs>
<<<<<<< HEAD
                                        <linearGradient id="splitColor1" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset={forOne()} stopColor="green" stopOpacity={1} />
                                            <stop offset={forOne()} stopColor="red" stopOpacity={1} />
=======
                                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1"> 
                                            <stop offset="0" stopColor="green" stopOpacity={1} /> 
                                            <stop offset="0" stopColor="red" stopOpacity={1} />
>>>>>>> 0344fde0a8db28051e71ebfb6cd1cf1384a3d0fd
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="valor" stroke="#000" fill="url(#splitColor1)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Paper>
                </Grid>


                <Grid item xs={12} sm={6} className={classes_.cardAnimation} id="mitwo">
                    <Paper className={classes_.paper}>
                        <Typography variant="h5" component="h4" className={classes_.post1}>
                            Test No. 2
                        </Typography>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart width={500} height={400} data={get(2)} margin={{ top: 20, right: 50, left: 0, bottom: 20 }} >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <defs>
<<<<<<< HEAD
                                        <linearGradient id="splitColor2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset={forTwo()} stopColor="green" stopOpacity={1} />
                                            <stop offset={forTwo()} stopColor="red" stopOpacity={1} />
=======
                                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1"> 
                                            <stop offset="0" stopColor="green" stopOpacity={1} /> 
                                            <stop offset="0" stopColor="red" stopOpacity={1} /> 
>>>>>>> 0344fde0a8db28051e71ebfb6cd1cf1384a3d0fd
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="valor" stroke="#000" fill="url(#splitColor2)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} className={classes_.cardAnimation} id="mitree">
                    <Paper className={classes_.paper}>
                        <Typography variant="h5" component="h4" className={classes_.post1}>
                            Test No. 3
                        </Typography>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart width={500} height={400} data={get(3)} margin={{ top: 20, right: 50, left: 0, bottom: 20 }} >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <defs>
<<<<<<< HEAD
                                        <linearGradient id="splitColor3" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset={muestra(3)} stopColor="green" stopOpacity={1} />
                                            <stop offset={muestra(3)} stopColor="red" stopOpacity={1} />
=======
                                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1"> 
                                            1<stop offset="0" stopColor="green" stopOpacity={1} /> 
                                            <stop offset="0" stopColor="red" stopOpacity={1} /> 
>>>>>>> 0344fde0a8db28051e71ebfb6cd1cf1384a3d0fd
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="valor" stroke="#000" fill="url(#splitColor3)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} className={classes_.cardAnimation} id="mifour">
                    <Paper className={classes_.paper}>
                        <Typography variant="h5" component="h4" className={classes_.post1}>
                            Test No. 4
                        </Typography>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart width={500} height={400} data={get(4)} margin={{ top: 20, right: 50, left: 0, bottom: 20 }} >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <defs>
                                        <linearGradient id="splitColor4" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset={muestra(4)} stopColor="green" stopOpacity={1} />
                                            <stop offset={muestra(4)} stopColor="red" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="valor" stroke="#000" fill="url(#splitColor4)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} className={classes_.cardAnimation} id="mifive">
                    <Paper className={classes_.paper}>
                        <Typography variant="h5" component="h4" className={classes_.post1}>
                            Test No. 5
                        </Typography>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart width={500} height={400} data={get(5)} margin={{ top: 20, right: 50, left: 0, bottom: 20 }} >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <defs>
                                        <linearGradient id="splitColor5" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset={muestra(5)} stopColor="green" stopOpacity={1} />
                                            <stop offset={muestra(5)} stopColor="red" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="valor" stroke="#000" fill="url(#splitColor5)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} className={classes_.cardAnimation} id="misix">
                    <Paper className={classes_.paper}>
                        <Typography variant="h5" component="h4" className={classes_.post1}>
                            Test No. 6
                        </Typography>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart width={500} height={400} data={get(6)} margin={{ top: 20, right: 50, left: 0, bottom: 20 }} >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <defs>
<<<<<<< HEAD
                                        <linearGradient id="splitColor6" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset={muestra(6)} stopColor="green" stopOpacity={1} />
                                            <stop offset={muestra(6)} stopColor="red" stopOpacity={1} />
=======
                                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1"> 
                                            <stop offset="0" stopColor="green" stopOpacity={1} /> 
                                            <stop offset="0" stopColor="red" stopOpacity={1} /> 
>>>>>>> 0344fde0a8db28051e71ebfb6cd1cf1384a3d0fd
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="valor" stroke="#000" fill="url(#splitColor6)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} className={classes_.cardAnimation} id="miseven">
                    <Paper className={classes_.paper}>
                        <Typography variant="h5" component="h4" className={classes_.post1}>
                            Test No. 7
                        </Typography>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart width={500} height={400} data={get(7)} margin={{ top: 20, right: 50, left: 0, bottom: 20 }} >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <defs>
                                        <linearGradient id="splitColor7" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset={muestra(7)} stopColor="green" stopOpacity={1} />
                                            <stop offset={muestra(7)} stopColor="red" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="valor" stroke="#000" fill="url(#splitColor7)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} className={classes_.cardAnimation} id="mieght">
                    <Paper className={classes_.paper}>
                        <Typography variant="h5" component="h4" className={classes_.post1}>
                            Test No. 8
                        </Typography>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart width={500} height={400} data={get(8)} margin={{ top: 20, right: 50, left: 0, bottom: 20 }} >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <defs>
                                        <linearGradient id="splitColor8" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset={muestra(8)} stopColor="green" stopOpacity={1} />
                                            <stop offset={muestra(8)} stopColor="red" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="valor" stroke="#000" fill="url(#splitColor8)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} className={classes_.cardAnimation} id="minine">
                    <Paper className={classes_.paper}>
                        <Typography variant="h5" component="h4" className={classes_.post1}>
                            Test No. 9
                        </Typography>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart width={500} height={400} data={get(9)} margin={{ top: 20, right: 50, left: 0, bottom: 20 }} >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <defs>
                                        <linearGradient id="splitColor9" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset={muestra(9)} stopColor="green" stopOpacity={1} />
                                            <stop offset={muestra(9)} stopColor="red" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="valor" stroke="#000" fill="url(#splitColor9)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} className={classes_.cardAnimation} id="miten">
                    <Paper className={classes_.paper}>
                        <Typography variant="h5" component="h4" className={classes_.post1}>
                            Test No. 10
                        </Typography>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart width={500} height={400} data={get(10)} margin={{ top: 20, right: 50, left: 0, bottom: 20 }} >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <defs>
                                        <linearGradient id="splitColor10" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset={muestra(10)} stopColor="green" stopOpacity={1} />
                                            <stop offset={muestra(10)} stopColor="red" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="valor" stroke="#000" fill="url(#splitColor10)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Paper>
                </Grid>

            </Grid>
        </div>
    );
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);