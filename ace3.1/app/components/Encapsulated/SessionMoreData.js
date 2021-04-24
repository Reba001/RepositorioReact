import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { Apiurl } from './../../services/apirest';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import './tabla.css';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    Divider,
    Grid,
    AppBar,
    Toolbar,
    Typography,
    Slide,
} from '@material-ui/core';

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const styles_ = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '1%'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    izq: {
        'float': 'right'
    },
    cardAnimation: {
        'animation': 'appear 500ms ease-out forwards'
    },
}));

const styles = theme => ({
    table: {
        '& > div': {
            overflow: 'auto'
        },
        '& table': {
            '& td': {
                wordBreak: 'keep-all'
            },
            [theme.breakpoints.down('md')]: {
                '& td': {
                    height: 60,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }
            }
        }
    },
    button: {
        margin: theme.spacing(0),
    },
    redBtn: {
        color: '#f44336',
        'border-color': '#f44336'
    },
    blueBtn: {
        color: '#7986cb',
        'border-color': '#7986cb'
    },
    blackBtn: {
        color: '#000000',
        'border-color': '#000000'
    },
    appBar: {
        position: 'relative',
    },
});

function AdvFilter(props) {

    const [msg, setMsg] = useState([]);

    const getMsg = async () => {
        try {
            let url = Apiurl + "/miavma";
            const currentIdCouch = localStorage.getItem('idUsuarioLogin');
            const objectVar = { id_usuario: currentIdCouch };
            await axios.post(url, objectVar).then(data => {
                console.log(data);
                const result = [];
                var contador = 0;
                var idSessionActual = 0;
                var idSessionGuardado = 0;
                data.data.forEach(item => {
                    idSessionActual = item.sesion;
                    if (item.sesion == localStorage.getItem('id_session')) {
                        result[contador] = [item.tipo, item.MINIM0, item.PROMEDIO, item.MAXIMO, item.fecha];
                        contador++;
                    }
                    idSessionGuardado = idSessionActual;
                });
                setMsg(result);
            });
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getMsg();
    }, [])


    const columns = [
        {
            name: 'Type ',
            options: {
                filter: true
            }
        },
        {
            name: 'Minimum',
            options: {
                filter: true
            }
        },
        {
            name: 'Average',
            options: {
                filter: true
            }
        },
        {
            name: 'Maximum',
            options: {
                filter: true
            }
        },
        {
            name: 'Date',
            options: {
                filter: true
            }
        },
    ];

    const options = {
        filterType: 'dropdown',
        responsive: 'stacked',
        fixedHeader: true,
        elevation: 0,
        rowsPerPage: 10,
        page: 0,
        selectableRows: false
    };

    function d(asd) {
        var newArray = [];
        for (var i = 0; i < asd.length; i++) {
            if (asd[i] === undefined) {

            } else {
                newArray.push(asd[i]);
            }
        }
        return newArray;
    }

    const { classes } = props;
    return (
        <MuiThemeProvider theme={myTheme}>
            <MUIDataTable className="mitabla_"
                data={d(msg)}
                columns={columns}
                options={options}
            />
        </MuiThemeProvider>
    );
}

AdvFilter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvFilter);

const myTheme = createMuiTheme({
    overrides: {
        MUIDataTable: {
            responsiveScroll: {
                maxHeight: "580px"
                // overflowY: 'scroll',
            }
        }
    }
});