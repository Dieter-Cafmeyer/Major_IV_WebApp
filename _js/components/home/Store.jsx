'use strict';

import React, {Component} from 'react';
import {basename} from '../../globals';

export default class Store extends Component {
  constructor(props, context){
    super(props, context);
  }

  render(){
    let {logo, color} = this.props;

    return (
      <article className={`shop-item ${color}`}><img src={`${basename}${logo}`} /></article>
    );
  }
}
