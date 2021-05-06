import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: '8px 0',
      width: '100%',
    },
    '& .MuiContainer-root': {
      [theme.breakpoints.down('sm')]: {
        padding: 5
      },
    }
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: '8px 16px 0px',
    borderRadius: 8,
    margin: '10px 0',
    [theme.breakpoints.down('sm')]: {
      padding: 0
    },
    '& img': {
      height: 700
    }
  }
}));
