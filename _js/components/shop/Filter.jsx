'use strict';

import React, {Component} from 'react';
import {basename} from '../../globals';

import {Link} from 'react-router';

export default class Filter extends Component {
  constructor(props, context){
    super(props, context);
  }

  changeHandler(){
    var slider = document.getElementById('matenslider');
    slider.value = slider.value;
  }

  render(){
    return (
      <aside>
        <h1>Filters</h1>
        <h2>Aantal punten</h2>

        <div className="filterslidercount"><h3>&nbsp;&nbsp;&nbsp; 1 punt</h3><h3>100 punten</h3></div>
        <div className="filterslider"><input id="matenslider" type="range" min="1" max="100" defaultValue="1" onChange={() => this.changeHandler()}></input></div>

        <h2>Maten</h2>
        <ul className="maten">
          <li>XS</li>
          <li className="maten-selected">S</li>
          <li>M</li>
          <li>L</li>
          <li>XL</li>
          <li className="specialsize">XXL</li>
        </ul>


        <h2>Kleuren</h2>
        <ul className="maten">
          <li className="blueselect"></li>
          <li className="redselect"></li>
          <li className="greenselect"></li>
          <li className="yellowselect"></li>
          <li className="blackselect"></li>
          <li className="grayselect specialsize"></li>
        </ul><br/><br/>

        <div className="filterslider"><Link to="/kaart"><button className="btn-white">TOEPASSEN</button></Link></div>
      </aside>
    );
  }
}
