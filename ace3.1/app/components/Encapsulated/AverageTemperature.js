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
        let url = Apiurl + "/promedio";
        const currentIdCouch = localStorage.getItem('idUsuarioLogin');
        const objectVar = {
            id_usuario: currentIdCouch,
            id_medicion: 3
        };
        await axios.post(url, objectVar).
            then(data => {
                if(data.data[0] != undefined){
                    var datos = data.data[0];
                    var datos_ = JSON.parse(datos.consulta);
                    //console.log(datos_.message);
                    result[contador] = { name: datos_.message };
                }
                
                //var fechaActual = "";
                //data.data.forEach(item => {
                        
                    //console.log(item);
                    //result[contador] = { name: fechaActual };

                //})
                setPoints(result);
            });
    }
    const [points, setPoints] = useState([]);

    //console.log(JSON.parsepoints[0]);
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
    if (newArray.length > 0) {
        salida = newArray[0].name;
    }

    return salida;
}