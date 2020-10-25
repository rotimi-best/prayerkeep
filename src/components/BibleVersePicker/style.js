import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  dialogRoot: {
    width: 300,
    height: 500,
    '& .MuiDialogContent-root': {
      padding: 0,
      width: 300,
      '& #scrollable-tabpanel': {
        marginTop: 10,
      },
      '& .MuiTab-root': {
        minWidth: 100
      },
      '&': {
        scrollbarWidth: 'thin',
        scrollbarColor: 'white',
      },

      /* Works on Chrome/Edge/Safari */
      '& ::-webkit-scrollbar': {
        width: 8,
      },
      '& ::-webkit-scrollbar-track': {
        background: '#fff',
      },
      '& ::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 20,
        border: 'unset'
      },
    },
    '& .MuiFab-root.Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.26)',
      backgroundColor: 'rgba(0, 0, 0, 0.12)'
    },
    '& .MuiFab-primary': {
      color: '#fff',
      backgroundColor: theme.palette.primary.main
    }
  },
  numberList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(5px, 60px))',
    gridGap: '1rem',
    margin: '0 10px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clickableNumber: {
    color: '#000',
    fontSize: 14,
    width: 40,
    height: 40
  },
  selectedNumber: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff'
  },
  hint: {
    width: '80%',
    marginLeft: 15,
    fontStyle: 'italic',
    fontSize: 15
  }
}));
