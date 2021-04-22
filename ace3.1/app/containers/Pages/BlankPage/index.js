import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import AdvFilter from './../../../components/Tables/Dash'

window.onresize = doALoadOfStuff;

function doALoadOfStuff() {
    //console.log(document.getElementById("hearRate").clientWidth);
    //document.getElementById('reactgooglegraph-15').style.width = "20px !important";
    //document.getElementById("hearRate").style.width = "300px";
}

function BlankPage() {
  const title = brand.name + ' - Blank Page';
  const description = brand.desc;
  return (
    <div>
      <AdvFilter />
    </div>
  );
}

export default BlankPage;
