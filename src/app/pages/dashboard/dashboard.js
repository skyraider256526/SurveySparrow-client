import React, { useEffect, useState } from 'react';

/// Redux
import { useSelector, useDispatch } from 'react-redux';

/// MUI
import {
  Grid,
  Typography,
  CircularProgress,
  Container,
} from '@material-ui/core';

/// User
import useStyles from './dashboard.styles';
import Profile from '../../profile/profile';
import UrlList from '../../urls/urlList';
import { fetchUrls } from 'features/url/urlSlice';

/// Driver
function Dashboard() {
  const userData = useSelector(state => state.user.credentials);
  const isLoading = useSelector(state => state.url.loading);
  const urls = useSelector(state => state.url.urls);

  /// Redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUrls());
  }, [dispatch]);

  const classes = useStyles();
  return isLoading === 'idle' ? (
    <Grid container spacing={2} className={classes.dashboard}>
      <Grid item xs={12} md={4} container direction="column">
        <Profile userData={userData} />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        container
        direction="column"
        justify="space-between"
      >
        <UrlList urls={urls} />
      </Grid>
    </Grid>
  ) : (
    <Container className={classes.progress}>
      <CircularProgress />
    </Container>
  );
}

export default Dashboard;
