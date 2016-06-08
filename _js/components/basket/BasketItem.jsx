'use strict';

import React, {Component} from 'react';

export default class BasketItem extends Component {
  constructor(props, context){
    super(props, context);
    console.log(this.props);
  }

  render(){
    return (
      <div>
        <p>{this.props.name}</p>
      </div>
    );
  }
}
