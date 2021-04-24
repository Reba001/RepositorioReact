import React , { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Apiurl } from '../../services/apirest';


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
var fechaactual = "";
var fechaanterior = "";
function Dar() {
    /*useEffect( () => {
        const timeOut = setInterval(() => {
            getMsg();
        }, 1000)

        getMsg();

        return () => {
            clearInterval(timeOut);
        }
    }, [ ] )

    /*
    https://ykpvsqrkyj.execute-api.us-east-2.amazonaws.com/practica2/miavma
    PARAMETROS:
    {
      "id_usuario": "2"
    }
    */

    const getMsg = async () => {
        let url = Apiurl + "/miavma";
        const currentIdUsuario = localStorage.getItem('idUsuarioLogin');
        const objectVar = {
            id_usuario: currentIdUsuario
        };
        await axios.post(url, objectVar).
            then(data => {
                console.log("Esta es una parte de card de peso");
                console.log(data.data);

                data.data.forEach(item => {
                   console.log("Item individual");
                   console.log(item);

                   fechaanterior = fechaactual;
                   fechaactual = item.fecha;
                   if(fechaactual !== fechaanterior){
                      result.push( { 
                        idusuario: item.id_usuario,
                        sesion: item.sesion,
                        tipo: item.tipo,
                        minimo: item.MINIMO,
                        maximo: item.MAXIMO,
                        promedio: item.PROMEDIO,
                        fecha: item.fecha  
                      } );

                   }
                   
                    
                    contador++;
                })
                console.log("------- > result");
                console.log(result);

                setPoints(result);
            });
    }
    const [points, setPoints] = useState([]);

    return points;
}

function d(asd, sesion) {
    
    var objeto = asd.find(e => e.tipo == "inhalar" && e.sesion == sesion);
    console.log("--------- OBJETO -----------");
    console.log(objeto);
    
    return objeto;
}


export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;


  return (
      
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            VOLUMEN DE AIRE MINIMO INHALADO 
        </Typography>
        <Typography variant="h5" component="h2">
            68
            
        </Typography>
       
       
      </CardContent>
      
    </Card>
  );
}