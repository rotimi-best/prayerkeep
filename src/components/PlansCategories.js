import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  listItemText: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}));

export default function PlansCategories() {
  const classes = useStyles();

  return (
    <List className={classes.root} aria-label="mailbox folders">
      <ListItem button divider>
        <ListItemText
          classes={{
            multiline: classes.listItemText
          }}
          primary="Saved"
          secondary="5"
        />
      </ListItem>
      <ListItem button divider>
        <ListItemText
          classes={{
            multiline: classes.listItemText
          }}
          primary="Completed"
          secondary="10"
        />
      </ListItem>
      <ListItem button divider>
        <ListItemText
          classes={{
            multiline: classes.listItemText
          }}
          primary="Stopped"
          secondary="0"
        />
      </ListItem>
    </List>
  )
}
