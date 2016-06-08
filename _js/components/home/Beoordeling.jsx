'use strict';

import React, {Component} from 'react';
import {basename} from '../../globals';

export default class Beoordeling extends Component {
  constructor(props, context){
    super(props, context);
  }

  render(){
    return (
      <div className="beoordeling">

        <img src={`${basename}/assets/img/shoe1.jpg`}/>

        <div className="titlebar">
          <h2>Adidas Originals Superstars</h2>
          <h3>De perfecte sneakers voor hipsters!</h3>
        </div>

        <div className="beoordeling-btns">
          <p className="points-count">12 punten</p>

          <div>
            <button className="beoordeling-btn good"></button>
            <button className="beoordeling-btn bad"></button>
          </div>
        </div>

      </div>
    );
  }
}
