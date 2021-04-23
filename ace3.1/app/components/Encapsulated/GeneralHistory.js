import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Apiurl } from './../../services/apirest';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

var result = [];
var contador = 0;
let url = Apiurl + "/historial";
const currentIdUsuario = localStorage.getItem('idUsuarioLogin');
const objectVar = {
    id_usuario: currentIdUsuario,
    id_medicion: "1",
    limit: "0"
};

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
        const currentIdUsuario = localStorage.getItem('idUsuarioLogin');
        
        await axios.post(url, objectVar).
            then(data => {
                var sesion_ = 0;
                var valor_ = "";
                var fecha_ = "";
                //console.log(data);
                data.data.forEach(item => {
                    fecha_ = item.fecha;
                    sesion_ = item.id_sesion;
                    valor_ = item.valor;
                    if (contItems4 == 4) {
                        if (contador <= 19) {
                            result[contador] = { sesion:session_, pulso: pulso_, temperatura: temperatura_, velocidad: velocidad_, distancia: distancia_ };
                        }
                        contador++;
                        contItems4 = 0;
                    }
                })

                setPoints(result);
            });
    }
    const [points, setPoints] = useState([]);

    points.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    return points;
}


export default function App() {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={Dar()}
                    margin={{
                        top: 5,
                        right: 0,
                        left: -5,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pulso" name="pulso (bpm)" fill="red" />
                    <Bar dataKey="temperatura" name="temperatura (°C)" fill="purple" />
                    <Bar dataKey="velocidad" name="velocidad (m/s)" fill="navy" />
                    <Bar dataKey="distancia" name="distancia (m)" fill="coral" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
