import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import FinalTestGraph_ from './../../../components/Encapsulated/FinalTestGraph'
import { Apiurl } from './../../../services/apirest';
import axios from 'axios';

window.onresize = doALoadOfStuff;

function doALoadOfStuff() {
}

let url = Apiurl + "/historial";
const currentIdUsuario = localStorage.getItem('idUsuarioLogin');
const objectVar = {
    id_usuario: currentIdUsuario,
    id_medicion: "1",
    limit: "0"
};

function get() {
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
        var result = [];
        await axios.post(url, objectVar).
            then(data => {
                data.data.forEach(item => {
                    if (item.id_sesion == 1) {
                        document.getElementById('mione').style.display = "block";
                    }
                    if (item.id_sesion == 2) {
                        document.getElementById('mitwo').style.display = "block";
                    }
                    if (item.id_sesion == 3) {
                        document.getElementById('mitree').style.display = "block";
                    }
                    if (item.id_sesion == 4) {
                        document.getElementById('mifour').style.display = "block";
                    }
                    if (item.id_sesion == 5) {
                        document.getElementById('mifive').style.display = "block";
                    }
                    if (item.id_sesion == 6) {
                        document.getElementById('misix').style.display = "block";
                    }
                    if (item.id_sesion == 7) {
                        document.getElementById('miseven').style.display = "block";
                    }
                    if (item.id_sesion == 8) {
                        document.getElementById('mieght').style.display = "block";
                    }
                    if (item.id_sesion == 9) {
                        document.getElementById('minine').style.display = "block";
                    }
                    if (item.id_sesion == 10) {
                        document.getElementById('miten').style.display = "block";
                    }
                })
            });
    }

}

function FinalTestGraph() {
    const title = brand.name + ' - Final Test Graph';
    const description = brand.desc;
    get();
    return (
        <div>
            <FinalTestGraph_ />
        </div>
    );
}

export default FinalTestGraph;
