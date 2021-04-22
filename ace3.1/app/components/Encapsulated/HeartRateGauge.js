import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import "./estilo.css";
import { Apiurl } from './../../services/apirest';
import axios from 'axios';

window.onresize = doALoadOfStuff;

function doALoadOfStuff() {
    //console.log(document.getElementById("hearRate").clientWidth);
    //document.getElementById('reactgooglegraph-15').style.width = "20px !important";
    //document.getElementById("reactgooglegraph-15").style.width = "300px";
}

const options = {
    min: 0, max: 1000,
    redFrom: 740, redTo: 1000,
    yellowFrom: 600, yellowTo: 740,
    minorTicks: 5,
    width: 180,
    width_units: '100%'
};

const getRandomNumber = () => {
    return Math.random() * 1000;
};

class App extends React.Component {
    state = {
        memory: 0
    };
    intervalID = null;
    getData = () => {
        return [
            ["Label", "Value"],
            ["BPM", this.state.memory]
        ];
    };
    componentWillUnmount() {
        if (this.intervalID === null) return;
        clearInterval(this.intervalID);
    }
    componentDidMount() {
        let url = Apiurl + "/rcget";
        const currentIdCouch = localStorage.getItem('idUsuarioLogin');
        const objectVar = {
            id_usuario: currentIdCouch,
            id_medicion: 2
        };
        this.intervalID = setInterval( async () => {
            await axios.post(url, objectVar).then(data => {
                //console.log(data);
                //(data.data[0].valor == null ? 0 : data.data[0].valor)
                this.setState(state => {
                    return {
                        ...state,
                        memory: (data.data.length > 0 ? data.data[0].valor : 0)
                    };
                });
            });

        }, 1000);
    }
    render() {
        return (
            <div id="hearRate">
                <Chart
                    chartType="Gauge"
                    data={this.getData()}
                    options={options}
                />
            </div>
        );
    }
}

//const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);

export default App;