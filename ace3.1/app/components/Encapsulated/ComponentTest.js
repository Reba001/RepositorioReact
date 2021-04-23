import React, { useEffect, useState } from "react";
import { Apiurl } from './../../services/apirest';
import axios from 'axios';


import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

/*const data = [
    {
        name: "Page A",
        valor: 4000,
        pv: 2400,
        amt: 2400
    },
    {
        name: "Page B",
        valor: 3000,
        pv: 1398,
        amt: 2210
    },
    {
        name: "Page C",
        valor: -1000,
        pv: 9800,
        amt: 2290
    },
    {
        name: "Page D",
        valor: 500,
        pv: 3908,
        amt: 2000
    },
    {
        name: "Page E",
        valor: -2000,
        pv: 4800,
        amt: 2181
    },
    {
        name: "Page F",
        valor: -250,
        pv: 3800,
        amt: 2500
    },
    {
        name: "Page G",
        valor: 3490,
        pv: 4300,
        amt: 2100
    }
];*/


var result = [];
var contador = 0;
var fechaanterior_ = "";
var ultimafecha_ = "";


function Dar() {
    useEffect( () => {
        const timeOut = setInterval(() => {
            getMsg();
        }, 500)

        getMsg();

        return () => {
            clearInterval(timeOut);
        }
    }, [ ] )

    const getMsg = async () => {
        let url = Apiurl + "/rcget";
        const currentIdUsuario = localStorage.getItem('idUsuarioLogin');
        const objectVar = {
            id_usuario: currentIdUsuario,
            id_medicion: 2
        };
        await axios.post(url, objectVar).
            then(data => {
                let tipo_vol_ = "";
                let valor_ = "";
                
                
                console.log(data);
                data.data.forEach(item => {
                    console.log(item);
                    console.log(" -------  resultado -------");
                    if(item.fecha){
                        tipo_vol_ = item.descripcion;
                        valor_ = item.valor;
                        fechaanterior_ = ultimafecha_;
                        ultimafecha_ = item.fecha;
                        console.log(item.descripcion);
                        console.log(item.valor);
                        if (contador <= 30) {

                            if(fechaanterior_ !== ultimafecha_){
                                result[contador] = { tipovol: tipo_vol_, valor: valor_ , ultimafecha:ultimafecha_  };
                                contador++;
                            }
                            
                            console.log("--------- result -------");
                            console.log(result);
                            console.log(fechaanterior_);
                            console.log(ultimafecha_);
                        
                            
                        }else{
                            result.splice(29, 1);
                            contador--;
                        }
                    }
                    
                })

                setPoints(result);
            });
    }
    const [points, setPoints] = useState([]);

    return points;
}

/*const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.valor));
    const dataMin = Math.min(...data.map((i) => i.valor));

    if (dataMax <= 0) {
        return 0;
    }
    if (dataMin >= 0) {
        return 1;
    }

    return dataMax / (dataMax - dataMin);
};

const off = gradientOffset();*/

export default function App() {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={Dar()}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    
                    <YAxis />
                    <Tooltip />
                    <defs>
                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="green" stopOpacity={1} />
                            <stop offset="0" stopColor="red" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="valor"
                        stroke="#000"
                        fill="url(#splitColor)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
