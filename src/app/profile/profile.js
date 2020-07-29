import React from 'react';

/// Redux
import { useSelector } from 'react-redux';

/// MUI
import { Typography } from '@material-ui/core';

function Profile() {
  const user = useSelector(state => state.user.credentials);
  console.log(user);
  return <div></div>;
}

export default Profile;
