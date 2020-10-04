import colors from "../../constants/colors";

export default theme => ({
  toolbar: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
    padding: '20px 0',
    '& .MuiTextField-root': {
      margin: '8px 0',
      width: '100%',
    },
  },
  containerRoot: {
    paddingLeft: 5,
    paddingRight: 5
  },
  userStatsRoot: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    // alignItems: "center",
    padding: '10px'
  },
  userStatsBody: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  daysPrayed: {
    textAlign: "center"
  },
  daysPrayedStats: {
    display: "flex",
    alignItems: "baseline"
  },
  userStat: {
    margin: "20px 0",
    padding: "0 20px",
    textAlign: "center"
  },
  userStatsCaption: {
    // fontFamily: `"Lato script=all rev=1"`,
    fontStyle: "bold",
    color: colors.grey,
    fontSize: 13
  },
  divider: {
    borderRight: `1px solid #dadada`
  },
  bibleQuote: {
    color: "black",
    fontFamily: `"Lato script=all rev=1"`,
    textAlign: 'start',
    marginBottom: 5
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold'
  },
  bibleVerse: {
    color: colors.grey
  },
  prayersForToday: {
    margin: '10px 0',
    padding: 20
  },
  formLabel: {
    paddingTop: '10px',
    fontSize: 18,
    fontStyle: 'normal',
  },
  formHelperText: {
    paddingBottom: 15
  },
  formControlRoot: {
    width: '100%'
  },
  cardActionRoot: {
    padding: 0,
    fontSize: 16
  },
  listRoot: {
    width: '100%',
    padding: 0,
    '& .MuiListItem-root': {
      padding: '5px 0'
    },
    '& .MuiListItemAvatar-root': {
      'min-width': 'unset',
      marginRight: 10
    }
  },
  inline: {
    display: 'inline'
  }
});
