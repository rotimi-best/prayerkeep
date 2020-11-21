import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    margin: '10px 0',
  },
  userWrapper: {
    position: 'relative',
    cursor: 'pointer',
    width: 'fit-content',
    margin: 10
  },
  isUploading: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: -5,
    left: -5,
    zIndex: 1,
  },
  storyViewerRoot: {
    '& .MuiDialogContent-root': {
      padding: 0,
      backgroundColor: '#000'
    }
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: 10,
    backgroundColor: '#000',
    '& .MuiButtonBase-root': {
      backgroundColor: '#fff'
    }
  },
  body: {
    '& div div div': {
      width: '100%'
    }
  }
}));
