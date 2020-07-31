import React, { Component } from 'react';

import { Box, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

class home extends Component {
  render() {
    return (
      <Box mt="40vh" textAlign="center" fontSize="2rem">
        Please&nbsp;
        <Link component={RouterLink} to="/login">
          Login&nbsp;
        </Link>
        or&nbsp;
        <Link component={RouterLink} to="/signup">
          SignUp&nbsp;
        </Link>
        to view your created URLs
      </Box>
    );
  }
}

export default home;
