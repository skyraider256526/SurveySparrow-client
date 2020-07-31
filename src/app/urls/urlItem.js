import React from 'react';
import { Container, ListItem, ListItemText } from '@material-ui/core';

function UrlItem({ url, handleListItemClick, selectedIndex }) {
  return (
    <ListItem
      button
      selected={selectedIndex === url.shortUrl}
      onClick={event => handleListItemClick(event, url.shortUrl)}
      divider={true}
    >
      <ListItemText
        primary="Original Url"
        primaryTypographyProps={{
          color: 'secondary',
        }}
        secondary={url.originalUrl}
        secondaryTypographyProps={{
          color: 'textSecondary',
        }}
      />
      <ListItemText
        inset
        primary="Short Url"
        primaryTypographyProps={{
          color: 'secondary',
        }}
        secondary={`bit-mock.ly/${url.shortUrl}`}
        secondaryTypographyProps={{
          color: 'textSecondary',
        }}
      />
    </ListItem>
  );
}

export default UrlItem;
