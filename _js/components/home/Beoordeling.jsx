'use strict';

import React, {Component} from 'react';

export default class Beoordeling extends Component {
  constructor(props, context){
    super(props, context);
  }

  render(){
    return (
      <div className="beoordeling">

        <img src="../../assets/img/shoe1.jpg"/>

        <div className="titlebar">
          <h2>Adidas Originals Superstars</h2>
          <h3>Korte beschrijving van het product</h3>
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
