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
        let url = Apiurl + "/historial";
        const currentIdUsuario = localStorage.getItem('idUsuarioLogin');
        const objectVar = {
            id_usuario: currentIdUsuario
        };
        await axios.post(url, objectVar).
            then(data => {
                var fechaActual = "";
                var distancia_ = "";
                var velocidad_ = "";
                var temperatura_ = "";
                var pulso_ = "";
                var contItems4 = "";
                console.log(data);
                data.data.forEach(item => {
                    fechaActual = item.fecha;
                    if (item.descripcion === "pulso") {
                        pulso_ = item.valor;
                    }
                    if (item.descripcion === "temperatura") {
                        temperatura_ = item.valor;
                    }
                    if (item.descripcion === "velocidad") {
                        velocidad_ = item.valor;
                    }
                    if (item.descripcion === "distancia") {
                        distancia_ = item.valor;
                    }
                    contItems4++;
                    if (contItems4 == 4) {
                        if (contador <= 19) {
                            result[contador] = { name: fechaActual, pulso: pulso_, temperatura: temperatura_, velocidad: velocidad_, distancia: distancia_ };
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
