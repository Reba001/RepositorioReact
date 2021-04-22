import React , { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Apiurl } from './../../services/apirest';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

var result = [];
var resultCompleto = [];
var contador = 0;
function Dar() {
    useEffect( () => {
        const timeOut = setInterval(() => {
            getMsg();
        }, 1000)

        getMsg();

        return () => {
            clearInterval(timeOut);
        }
    }, [ ] )

    const getMsg = async () => {
        let url = Apiurl + "/getpeso";
        const currentIdUsuario = localStorage.getItem('idUsuarioLogin');
        const objectVar = {
            idusuario: currentIdUsuario
        };
        await axios.post(url, objectVar).
            then(data => {
                var peso_ = "";
                var distancia_ = "";
                var velocidad_ = "";
                var temperatura_ = "";
                var nombre_ = "";
                var contItems4 = "";
                console.log("Esta es una parte de card de peso");
                console.log(data.data);

                data.data.forEach(item => {
                    peso_ = item.peso;
                    nombre_ = item.nombre;
                    
                   
                    result[contador] = { peso: peso_, nombre: nombre_ };
                    
                    contador++;
                })

                setPoints(result);
            });
    }
    const [points, setPoints] = useState([]);

    return points;
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
        salida = newArray[0].peso;
    }
    
    return salida;
}


export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;


  return (
      
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            peso en libras
        </Typography>
        <Typography variant="h5" component="h2">
            {d(Dar())}
        </Typography>
       
       
      </CardContent>
      
    </Card>
  );
}