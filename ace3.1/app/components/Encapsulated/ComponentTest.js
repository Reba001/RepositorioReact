import React, { useEffect, useState } from "react";
import { Apiurl } from './../../services/apirest';
import axios from 'axios';

import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label
} from "recharts";


import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: "100%",
        height: 350,
    },
}));

var result = [];
var contador = 0;
function Dar() {
    useEffect(() => {
        const timeOut = setInterval(() => {
            getMsg();
        }, 1000)

        getMsg();

        return () => {
            clearInterval(timeOut);
        }
    }, [])

    const getMsg = async () => {
        let url = Apiurl + "/rcget";
        const currentIdUsuario = localStorage.getItem('idUsuarioLogin');
        const objectVar = {
            id_usuario: currentIdUsuario,
            id_medicion: 1
        };
        await axios.post(url, objectVar).
            then(data => {
                data.data.forEach(item => {
                    result[contador] = item.valor;
                    contador++;
                })

                const newPuntos = Object.keys(result).map(k => ({
                    name: k, Volumen: result[k]
                }))

                setPoints(newPuntos);
            });
    }

    if (contador >= 30) {
        result.splice(0, 1);
    }
    const [points, setPoints] = useState([]);
    return points;
}
export default function App() {
    const classes = useStyles();
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={Dar()}
                    margin={{
                        top: 30,
                        right: 20,
                        left: 20,
                        bottom: 50
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <Tooltip />

                    <YAxis unit=" ml/s" type="number" label={{ value: 'Volumen', angle: -90, position: 'insideLeft' }} />

                    
                    <defs>
                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="green" stopOpacity={1} />
                            <stop offset="0" stopColor="red" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="Volumen"
                        stroke="#000"
                        fill="url(#splitColor)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}