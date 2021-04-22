import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import axios from 'axios';
import { Apiurl } from './../../services/apirest';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
    }
});

function AdvFilter(props) {
    const [state, setState] = React.useState({

    });

    const handleChange = async (event) => {
        //alert(String(event.target.name).replace(/^./, "") + "   " + event.target.checked);
        setState({ ...state, [event.target.name]: event.target.checked });
        let url = Apiurl + "/assignatletaforcouch";
        if (event.target.checked === true) {
            const idCouch = localStorage.getItem('idUsuarioLogin');
            const idAtleta = String(event.target.name).replace(/^./, "");
            const objectVar = {
                id_couch: idCouch,
                id_atleta: idAtleta,
                tipo: "asignacion"
            };

            await axios.post(url, objectVar).then(response => {
                if (String(JSON.parse(response.data[0].consulta).status) == "ok") {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Correctly assigned athlete'
                    })
                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'error',
                        title: 'An error has occurred.'
                    })
                }
            });
        } else {
            const idCouch = localStorage.getItem('idUsuarioLogin');
            const idAtleta = String(event.target.name).replace(/^./, "");
            const objectVar = {
                id_couch: idCouch,
                id_atleta: idAtleta,
                tipo: "desasignacion"
            };

            await axios.post(url, objectVar).then(response => {
                if (String(JSON.parse(response.data[0].consulta).status) == "ok") {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Correctly deallocated athlete'
                    })
                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'error',
                        title: 'An error has occurred.'
                    })
                }
            });
        }
    };

    const [msg, setMsg] = useState([]);

    const getMsg = async () => {
        try {
            let url = Apiurl + "/usersasign";
            const currentIdCouch = localStorage.getItem('idUsuarioLogin');
            const objectVar = { id_coach: currentIdCouch };
            await axios.post(url, objectVar).then(data => {
                const result = [];
                const result_ = [];
                data.data.forEach(item => {
                    if (item.id_coach === 0 || item.id_coach === null) {
                        result_["a" + item.id_usuario] = false;
                    } else {
                        result_["a" + item.id_usuario] = true;
                    }
                    result[item.id_usuario] = [item.username, item.nombre, item.apellido, (String(item.fecha_nac).split('T'))[0], item.id_usuario];
                });
                //console.log(result_);
                setState(result_)
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
            name: 'Username',
            options: {
                filter: true
            }
        },
        {
            name: 'Name',
            options: {
                filter: true
            }
        },
        {
            name: 'Surname',
            options: {
                filter: true
            }
        },
        {
            name: 'Date of Birth',
            options: {
                filter: true
            }
        },
        {
            name: 'Assign me athlete',
            options: {
                filter: false,
                customBodyRender: (value) => (
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={version(value)}
                                    onChange={handleChange}
                                    name={"a" + value}
                                    color="primary"
                                />
                            }
                        />
                    </FormGroup>
                )
            }
        },
    ];

    function version(a) {
        console.log(state);
        return state["a" + a];
    }

    const options = {
        filterType: 'dropdown',
        responsive: 'stacked',
        print: true,
        rowsPerPage: 10,
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
        console.log(newArray);
        return newArray;
    }

    const { classes } = props;

    return (
        <div className={classes.table}>
            <MUIDataTable
                title="Athlete list"
                data={d(msg)}
                columns={columns}
                options={options}
            />
        </div>
    );
}

AdvFilter.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvFilter);