import React from 'react';

/// MUI
import { Typography, Paper, Box } from '@material-ui/core';

import { CalendarToday } from '@material-ui/icons';

/// Misc
import dayjs from 'dayjs';

/// User
import useStyles from './profile.styles';

/// Driver
function Profile({ userData }) {
  // const {...userData};
  /// MUI
  const classes = useStyles();

  const createdAt = Date.now();
  return (
    <Paper className={classes.paper}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        height="100%"
      >
        <div>
          <Typography variant="h5" color="secondary">
            Email
          </Typography>
          <Typography variant="h6" color="textPrimary">
            {userData.email}
          </Typography>
        </div>
        <div>
          <Typography variant="h5" color="secondary">
            Username
          </Typography>
          <Typography variant="h5">{userData.username}</Typography>
        </div>
        <Box alignItems="end" display="flex">
          <CalendarToday color="primary" />{' '}
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </Box>
      </Box>
    </Paper>
  );
}

export default Profile;
