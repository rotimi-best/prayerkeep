import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  dialogRoot: {
    width: 400,
    height: 500,
    '& .MuiDialogContent-root': {
      padding: 0,
      width: 400,
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
      }
    },
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
    fontSize: 14,
    width: 40,
    height: 40
  }
}));
