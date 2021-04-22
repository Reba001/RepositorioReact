import avatarApi from '../images/avatars';
import { Apiurl } from './../../services/apirest';
import axios from 'axios';

const dummyContents = {
  user: {
    name: '', // ready
    title: '', // without use
    avatar: avatarApi[6], // need to define 
    status: '', // ready
    realName: '', // ready
    realSurname: '', // ready
    username: '', // ready
    birthDate: '', // ready
    iduser: '', // ready

    age: '', // ready
    sex: '', // ready
    weight: '', // ready
    height: '', // ready
    address: '', // ready
    telephone: '', // ready
  },
  text: {
    title: 'Lorem ipsum',
    subtitle: 'Ut a lorem eu odio cursus laoreet.',
    sentences: 'Donec lacus sem, scelerisque sed ligula nec, iaculis porttitor mauris.',
    paragraph: 'Sed rutrum augue libero, id faucibus quam aliquet sed. Phasellus interdum orci quam, volutpat ornare eros rhoncus sed. Donec vestibulum leo a auctor convallis. In dignissim consectetur molestie. Vivamus interdum tempor dui, nec posuere augue consequat sit amet. Suspendisse quis semper quam. Nullam nec neque sem.',
    date: 'Jan 9, 2018'
  }
};

window.onload = async function () {
  userData();
  /*alert("entro");
  var currentUsername = localStorage.getItem('useranme');
  let url = Apiurl + "/infouser";
  const objectVar = {username: currentUsername};
  await axios.post(url, objectVar)
  .then(response => {
    //console.log(response.data[0]);
    dummyContents.user.name = response.data[0].nombre.split(" ", 1) + " " + response.data[0].apellido.split(" ", 1);
    if(response.data[0].es_couch == 0){
      dummyContents.user.status = "Athlete";
    }else{
      dummyContents.user.status = "Coach";
    }
    dummyContents.user.realName = response.data[0].nombre;
    dummyContents.user.realSurname = response.data[0].apellido;
    dummyContents.user.username = response.data[0].username;
    dummyContents.user.birthDate = response.data[0].fecha_nac; // cambiar a formato correcto
    dummyContents.user.iduser = response.data[0].id_usuario;

    let urlCaracterisitca = Apiurl + "/infousercarac";
    const objectVarCaracterisitca = {id_usuario: response.data[0].id_usuario};
    axios.post(urlCaracterisitca, objectVarCaracterisitca)
    .then(resp => {
      if(resp.data.length > 0){
        dummyContents.user.age = resp.data[0].edad;
        dummyContents.user.sex = resp.data[0].sexo;
        dummyContents.user.weight = resp.data[0].peso;
        dummyContents.user.height = resp.data[0].estatura;
        dummyContents.user.address = resp.data[0].direccion;
        dummyContents.user.telephone = resp.data[0].telefono;
      }else{
        dummyContents.user.age = '0';
        dummyContents.user.sex = '';
        dummyContents.user.weight = '0';
        dummyContents.user.height = '0';
        dummyContents.user.address = 'n/a';
        dummyContents.user.telephone = '0';
      }
      console.log(resp.data);
    }).catch(e => {
    });

  }).catch(error => {
  });*/
}

async function userData() {
  //alert("entry");
  if (localStorage.getItem("idUsuarioLog") != "") {
    localStorage.removeItem("idUsuarioLogin");
    localStorage.setItem("idUsuarioLogin", localStorage.getItem("idUsuarioLog"));
    localStorage.removeItem("idUsuarioLog");
  }
  var currentUsername = localStorage.getItem('useranme');
  let url = Apiurl + "/infouser";
  const objectVar = { username: currentUsername };
  await axios.post(url, objectVar)
    .then(response => {
      //console.log(response.data[0]);
      dummyContents.user.name = response.data[0].nombre.split(" ", 1) + " " + response.data[0].apellido.split(" ", 1);
      if (response.data[0].es_couch == 0) {
        dummyContents.user.status = "Athlete";
      } else {
        dummyContents.user.status = "Coach";
      }
      localStorage.setItem('nac', (String(response.data[0].fecha_nac).split("."))[0]);
      localStorage.setItem('idUsuarioLogin', String(response.data[0].id_usuario));
      dummyContents.user.realName = response.data[0].nombre;
      dummyContents.user.realSurname = response.data[0].apellido;
      dummyContents.user.username = response.data[0].username;
      dummyContents.user.birthDate = response.data[0].fecha_nac; // cambiar a formato correcto
      dummyContents.user.iduser = response.data[0].id_usuario;

      let urlCaracterisitca = Apiurl + "/infousercarac";
      const objectVarCaracterisitca = { id_usuario: response.data[0].id_usuario };
      axios.post(urlCaracterisitca, objectVarCaracterisitca)
        .then(resp => {
          if (resp.data.length > 0) {
            dummyContents.user.age = resp.data[0].edad;
            dummyContents.user.sex = resp.data[0].sexo;
            dummyContents.user.weight = resp.data[0].peso;
            dummyContents.user.height = resp.data[0].estatura;
            dummyContents.user.address = resp.data[0].direccion;
            dummyContents.user.telephone = resp.data[0].telefono;
          } else {
            dummyContents.user.age = '0';
            dummyContents.user.sex = '';
            dummyContents.user.weight = '0';
            dummyContents.user.height = '0';
            dummyContents.user.address = 'n/a';
            dummyContents.user.telephone = '0';
          }
          //console.log(resp.data);
        }).catch(e => {
        });
    }).catch(error => {
    });
}

export const MyComponent = function () { userData(); };
export default dummyContents;
