'use strict';

import React, {Component} from 'react';
import {basename} from '../../globals';
import {Link} from 'react-router';

export default class Store extends Component {
  constructor(props, context){
    super(props, context);
  }

  render(){
    let {id, logo, color} = this.props;

    return (
      <Link to={`/shop/${id}`} className={`shopdetail ${color}`}>
        <article>
          <img src={`${basename}${logo}`} className="shopimg"/>
        </article>
      </Link>
    );
  }
}
