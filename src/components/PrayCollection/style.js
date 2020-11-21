import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    borderRadius: 20,
    '& .MuiDialogContent-root': {
      [theme.breakpoints.down('sm')]: {
        padding: 5
      }
    }
  },
  presentationRoot: {
    position: 'relative',
    maxHeight: 300,
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '80vh',
    }
  },
  playerRoot: {
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      bottom: 0,
      right: 10,
      left: 15
    }
  },
  actions: {
    display: "flex",
    justifyContent: "space-around"
  },
  previousArrow: {
    position: 'absolute',
    top: '40%',
    left: 0,
    zIndex: 2,
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
    }
  },
  nextArrow: {
    position: 'absolute',
    top: '40%',
    right: 0,
    zIndex: 2,
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
    }
  },
  pausePlayAction: {
    display: 'flex',
    alignItems: 'center'
  }
}));
