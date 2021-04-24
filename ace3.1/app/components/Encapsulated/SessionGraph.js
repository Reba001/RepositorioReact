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
                    localStorage.setItem("oneMax", Math.max(...result.map((i) => i.valor)));
                    localStorage.setItem("oneMin", Math.min(...result.map((i) => i.valor)));
                })

                setPoints(result);
            });
    }
    const [points, setPoints] = useState([]);
    return points;
}

function forOne() {
    return localStorage.getItem("oneMax") / (localStorage.getItem("oneMax") - (localStorage.getItem("oneMin")));
}


function App(props) {
    const { classes } = props;
    const classes_ = useStyles();
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart width={500} height={400} data={get(localStorage.getItem('id_session'))} margin={{ top: 20, right: 50, left: 0, bottom: 20 }} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <defs>
                        <linearGradient id="splitColor1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset={forOne()} stopColor="green" stopOpacity={1} />
                            <stop offset={forOne()} stopColor="red" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="valor" stroke="#000" fill="url(#splitColor1)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);