import React, { useState } from 'react';

/// MUI
import {
  List,
  Box,
  Container,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  Button,
} from '@material-ui/core';

import { red, blue, grey } from '@material-ui/core/colors';

import {
  AddCircle as AddCircleIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';

/// Axios
import axios from 'axios';

///User
import useStyles from './urls.styles';
import UrlItem from './urlItem';
function Urls({ urls }) {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [localUrls, setLocalUrls] = useState(urls);
  const [open, setOpen] = React.useState(false);
  const [newUrl, setNewUrl] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewUrl(null);
  };
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  // const handleUrlAdd = event;
  const handleChange = event => setNewUrl(event.target.value);

  const handleDelete = async () => {
    console.log(await axios.delete(`/url/${selectedIndex}`));
    setLocalUrls(prevState =>
      prevState.filter(url => url.shortUrl !== selectedIndex)
    );
  };

  const handleSubmit = async () => {
    const { data: url } = await axios.post('/url', {
      url: newUrl,
    });
    setLocalUrls(prevState => [...prevState, url]);
    setOpen(false);
    setNewUrl(null);
  };

  const urlItems = localUrls.map(url => (
    <UrlItem
      key={url.shortUrl}
      url={url}
      selectedIndex={selectedIndex}
      handleListItemClick={handleListItemClick}
    />
  ));

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="Create url">
        <DialogTitle id="add-url">Add URL</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill below form</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="URL"
            type="text"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <List aria-label="Urls list">{urlItems}</List>
      <Box alignSelf="end">
        <Container>
          <IconButton
            size="medium"
            style={{ marginLeft: 20 }}
            onClick={handleOpen}
          >
            <AddCircleIcon style={{ color: blue[500] }} fontSize="large" />
          </IconButton>
          <IconButton
            size="medium"
            disabled={selectedIndex === null}
            onClick={handleDelete}
          >
            <DeleteIcon
              style={{ color: selectedIndex === null ? grey[500] : red[500] }}
              fontSize="large"
            />
          </IconButton>
        </Container>
      </Box>
    </>
  );
}

export default Urls;
