'use strict';

import React, {Component} from 'react';

export default class Maten extends Component {
  constructor(props, context){
    super(props, context);
  }

  render(){
    return (
      <div>
      <h2>Beschikbare maten</h2>
    <ul className="maten">
      <li>38</li>
      <li>39</li>
      <li className="maten-selected">40</li>
      <li>41</li>
      <li>42</li>
      <li>43</li>
    </ul>
    </div>
    );
  }
}
