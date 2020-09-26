import React from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import { withStyles } from "@material-ui/core/styles";
import colorConstants from '../constants/colors';

const styles = () => ({
  paperRoot: {
    minWidth: 120,
    margin: '10px 10px 10px 0',
    padding: 20,
    color: '#fff',
    borderRadius: 20,
    cursor: 'pointer'
  },
  avatarRoot: {
    width: 25,
    height: 25,
    fontSize: 12
  },
  icon: {
    margin: '0 0 5px'
  },
  prayerCount: {
    color: '#e4e4e4',
    fontSize: 13,
    margin: '2px 0',
    fontWeight: '700'
  },
  collectionName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  center: {
    margin: '8px 0 15px'
  }
});

const CollectionMenuItem = props => {
  const {
    classes,
    collection = {},
    userPictureUrl
  } = props;
  const rootBgColor = collection.color && collection.color.length
    ? { backgroundColor: collection.color }
    : { backgroundColor: '#efb10d' };

    const prayerCountColor = collection.color
      ? colorConstants.colorsBg[collection.color]
        ? '#615b5b'
        : '#e4e4e4'
      : '#615b5b';

  return (
    <Paper
      elevation={3}
      classes={{
        root: classes.paperRoot
      }}
      style={rootBgColor}
    >
      <Grid item className={classes.icon}>
        <FolderIcon />
      </Grid>
      <Grid item className={classes.center}>
        <Typography variant="body2" className={classes.prayerCount} style={{ color: prayerCountColor }}>
          {collection.prayers.length} Prayers
        </Typography>
        <Typography variant="body2" className={classes.collectionName}>
          {collection.title.length > 15
            ? collection.title.slice(0, 15).trim().concat('...')
            : collection.title}
        </Typography>
      </Grid>
      <Grid item>
        <AvatarGroup>
          <Avatar classes={{root: classes.avatarRoot}} alt="Owner Profile Picture" src={userPictureUrl.data ? userPictureUrl.data.url : userPictureUrl} />
          {/* <Avatar classes={{root: classes.avatarRoot}} alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
          <Tooltip title="Foo • Bar • Baz">
            <Avatar classes={{root: classes.avatarRoot}}>+3</Avatar>
          </Tooltip> */}
        </AvatarGroup>
      </Grid>
    </Paper>
  )

}

export default withStyles(styles)(CollectionMenuItem);