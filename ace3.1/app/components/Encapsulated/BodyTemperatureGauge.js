import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import "./estilo.css";
import { Apiurl } from './../../services/apirest';
import axios from 'axios';

const options = {
    min: 0, max: 50,
    redFrom: 38, redTo: 50,
    yellowFrom: 36, yellowTo: 38,
    minorTicks: 2,
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
            ["°C", this.state.memory]
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
            id_medicion: 3
        };
        //(data.data[0].valor == null ? 0 : data.data[0].valor)
        this.intervalID = setInterval(async () => {
            await axios.post(url, objectVar).then(data => {
                //console.log(data);
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
        // console.log(this.getData());
        return (
            <div id="BodyTemperature">
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