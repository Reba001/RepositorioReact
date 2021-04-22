import React, { useCallback, useState, useEffect } from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
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
        var contador = 0;
        let url = Apiurl + "/historial";
        const currentIdCouch = localStorage.getItem('idUsuarioLogin');
        const objectVar = {
            id_usuario: currentIdCouch
        };
        await axios.post(url, objectVar).
            then(data => {
                var fechaActual = "";
                data.data.forEach(item => {
                    fechaActual = item.fecha;
                    if (item.descripcion === "pulso") {
                        contador++;
                    }
                        if (contador == 1) {
                            result[contador] = { name: fechaActual };
                        }
                    
                })
                setPoints(result);
            });
    }
    const [points, setPoints] = useState([]);

    return points;
}


export default function App() {
    
    return (
        <span>
            {d(Dar())}
        </span>
    );
}


function d(asd) {
    var salida = "";
    var newArray = [];
    for (var i = 0; i < asd.length; i++) {
        if (asd[i] == undefined) {

        } else {
            newArray.push(asd[i]);
        }
    }
    if(newArray.length > 0){
        salida = newArray[0].name;
    }
    
    return salida;
}