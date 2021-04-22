import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import { Apiurl } from './../../services/apirest';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import FileUpload from '@material-ui/icons/CloudUpload';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from '@material-ui/core/Tooltip';

import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
    flex: {
        flex: 1,
    },
});

function AdvFilter(props) {
    const [msg, setMsg] = useState([]);

    const getMsg = async () => {
        try {
            let url = Apiurl + "/contrep";
            const currentIdCouch = localStorage.getItem('idUsuarioLogin');
            const objectVar = {
                id_usuario: currentIdCouch,
                id_status: "3"
            };
            await axios.post(url, objectVar).then(data => {
                //console.log(data);
                const result = [];
                var i = 0;
                data.data.forEach(item => {
                    //console.log(item);
                    result[i] = [item.id_sesion, item.estatus, item.repeticiones, item.fecha];
                    i++;
                });
                //console.log(result);
                setMsg(result);
            });
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const timeOut = setInterval(() => {
            getMsg();
        }, 1000)
        getMsg();
        return () => clearInterval(timeOut);
    }, [])

    const columns = [
        {
            name: 'Session',
            options: {
                filter: true
            }
        },
        {
            name: 'Status',
            options: {
                filter: true
            }
        },
        {
            name: 'Repetitions',
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
        rowsPerPage: 4,
        page: 0
    };

    function d(asd) {
        var newArray = [];
        for (var i = 0; i < asd.length; i++) {
            if (asd[i] === undefined) {

            } else {
                newArray.push(asd[i]);
            }
        }
        //console.log(newArray);
        return newArray;
    }

    const { classes } = props;

    return (
        <div className={classes.table}>
            <MUIDataTable
                title="Count of times the athlete has failed"
                data={d(msg)}
                columns={columns}
                options={options}
            />
        </div>
    );
}

AdvFilter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvFilter);