'use strict';

import React, {Component} from 'react';

export default class Kaart extends Component {
  constructor(props, context){
    super(props, context);
  }

  render(){
    return (
      <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2461.013602774379!2d4.398363368980222!3d51.91546292652677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1swinkels+in+de+buurt+van+Hoogstraat%2C+Schiedam%2C+Nederland!5e0!3m2!1snl!2sbe!4v1464940559826" frameborder="0" allowfullscreen></iframe>
    );
  }
}
