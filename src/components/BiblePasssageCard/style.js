import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card: {
    margin: '5px 0',
    padding: 10,
    boxShadow: 'none',
    border: '1px solid #dadce0',
    borderRadius: 8,
  },
  title: {
    color: '#202124',
    letterSpacing: '.01428571em',
    lineHeight: '1.5rem',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  description: {
    color: '#202124',
    letterSpacing: '.01428571em',
    lineHeight: '1.5rem',
    fontSize: 16,
  },
  classContentRoot: {
    padding: '0 !important'
  },
  verseNumber: {
    color: '#010101',
    fontSize: '.7rem',
    fontWeight: 700,
    verticalAlign: 'super',
    padding: '0 5px',

  }
}));
