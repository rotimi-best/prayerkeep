import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import NotesIcon from '@material-ui/icons/Notes';
import FolderIcon from '@material-ui/icons/Folder';
import CreateSharpIcon from '@material-ui/icons/CreateSharp';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Button from '@material-ui/core/Button';

const styles = () => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: "#5f6368"
  },
  iconRoot: {
    width: 120,
    height: 120
  },
  text: {
    textAlign: 'center'
  }
});

const EmptyIcon = ({type, props}) => {
  switch(type) {
    case 'prayer':
      return <NotesIcon {...props} />;
    case 'collection':
      return <FolderIcon {...props} />;
    case 'comingSoon':
      return <AccessTimeIcon {...props} />;
    default:
      return <CreateSharpIcon {...props} />
  }
}

const Empty = props => {
  const { type, text, classes, onClick } = props;
  const iconProps = {
    classes: {
      root: classes.iconRoot
    }
  }
  return (
    <div className={classes.root}>
      <EmptyIcon type={type} props={iconProps} />
      <Typography variant="h6" className={classes.text}>
        {text}
      </Typography>
      {onClick && <Button variant="contained" color="primary" onClick={onClick}>
        Add New
      </Button>}
    </div>
  )
}

export default withStyles(styles)(Empty);
