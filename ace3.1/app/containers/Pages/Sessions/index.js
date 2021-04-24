import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
//import AdvFilter from './../../../components/Tables/Dash'
import Session from './../../../components/Encapsulated/Session'

window.onresize = doALoadOfStuff;

function doALoadOfStuff() {
    //console.log(document.getElementById("hearRate").clientWidth);
    //document.getElementById('reactgooglegraph-15').style.width = "20px !important";
    //document.getElementById("hearRate").style.width = "300px";
}

function Sessions() {
  const title = brand.name + ' - Sessions';
  const description = brand.desc;
  return (
    <div>
        <Session />
    </div>
  );
}

export default Sessions;
