'use strict';

import React from 'react';
import renderRole from '../../util/renderRole';

export default ({id, username, email, telephone, role, points}) => {
  return (
    <tr>
      <td className='id'>{id}</td>
      <td>{username}</td>
      <td className="email-td">{email}</td>
      <td>{telephone}</td>
      <td>{renderRole(role)}</td>
      <td>{points}</td>
    </tr>
  );
};

/*

*/
