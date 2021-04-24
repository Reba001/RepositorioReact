import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { Apiurl } from '../../services/apirest';

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
var fechaanterior = "";
var fechaactual = "";
const currentIdUsuario = localStorage.getItem('idUsuarioLogin');
const objectVar = {
    id_usuario: currentIdUsuario,
    id_medicion: "2"
};
let url = Apiurl + "/rcget";

const columns = [
    { id: 'sesion', label: 'No. Sesion', minWidth: 170 },
    { id: 'valor', label: 'Valor', minWidth: 100 },
    { id: "tipovol", label:'Tipo vol' , minWidth: 100},
    {
      id: 'fecha',
      label: 'Fecha',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
];

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });
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
          await axios.post(url, objectVar).
              then(data => {
                    var valor_ = 0;
                    var sesion_ = "";
                    var tipovol_ = "";
                    console.log(data);
                    data.data.forEach(item => {
                        valor_ = item.valor;
                        //sesion_ = item.id_sesion;
                        fechaanterior = fechaactual;
                        fechaactual = item.fecha;
                       // if(fechaactual !== fechaanterior){
                            if(valor_ > 0) {
                                tipovol_ = "exhalar";
                                
                            }else if(valor_ < 0) {
                                tipovol_ = "inhalar";

                            }else {
                                tipovol_ = "no respira";
                            }
                            result.push({
                                sesion: 1,
                                valor: valor_,
                                fecha: fechaactual,
                                tipovol : tipovol_ 
                            });
                        //}

                        
                    })

                    setPoints(result);
              });
      }
  
      /*if (contador >= 30) {
          result.splice(0, 1);
      }*/
      const [points, setPoints] = useState([]);
      return points;
  }
/*let url = Apiurl + "/historial";
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
        
        await axios.post(url, objectVar).
            then(data => {
                var valor_ = 0;
                var sesion_ = "";
                var tipovol_ = "";
                console.log(data);
                data.data.forEach(item => {
                    valor_ = item.valor;
                    sesion_ = item.id_sesion;
                    fechaanterior = fechaactual;
                    fechaactual = item.fecha;
                    if(fechaactual !== fechaanterior){
                        if(valor_ > 0) {
                            tipovol_ = "exhalar";
                            
                        }else if(valor_ < 0) {
                            tipovol_ = "inhalar";

                        }else {
                            tipovol_ = "no respira";
                        }
                        result.push({
                            sesion: sesion_,
                            valor: valor_,
                            fecha: fechaactual,
                            tipovol : tipovol_ 
                        });
                    }

                    
                })

                setPoints(result);
            });
    }
    const [points, setPoints] = useState([]);

    

    return points;
}
*/
export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Dar().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={Dar().length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
