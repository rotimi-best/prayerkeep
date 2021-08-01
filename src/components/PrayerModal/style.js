const styles = (theme) => ({
  root: {
    flexWrap: 'wrap',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  margin: {
    margin: `${theme.spacing(1)}px 0`,
  },
  newCollection: {
    margin: '5px 0',
    padding: 5,
    width: 'fit-content',
    '& .MuiButtonBase-root': {
      textTransform: 'unset',
    },
  },
  expansionRoot: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  section: {
    margin: '5px 0',
    minWidth: 120,
    width: '100%',
    border: '1px solid #e9e9e9',
    borderRadius: 4,
    padding: '5px 10px',
    '& .MuiFormLabel-root': {
      marginLeft: 10,
    },
  },
  chipRoot: {
    margin: 2,
  },
  choosenCollection: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  headerWithButton: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    '& .MuiFab-root': {
      width: 35,
      height: 30,
      marginLeft: 30,
    },
    '& .MuiSvgIcon-root': {
      width: 20,
      height: 18,
    },
  },
  dialogContent: {
    padding: '5px 20px',
  },
  chip: {
    margin: '2px 0',
  },
});

export default styles;
