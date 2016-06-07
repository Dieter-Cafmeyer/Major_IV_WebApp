'use strict';

import React from 'react';
import User from './User';

export default ({users}) => {
  return (
    <table>
      <thead>
        <tr>
          <td className='id'>#</td>
          <td>name</td>
          <td>email</td>
          <td>telefoon</td>
          <td>role</td>
          <td>punten</td>
        </tr>
      </thead>
      <tbody>
        {users.map(u => <User key={u.id} {...u}/>)}
      </tbody>
    </table>
  );
};
