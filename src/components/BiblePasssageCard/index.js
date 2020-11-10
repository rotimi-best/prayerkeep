import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import useStyles from './style';

const BiblePasssageCard = props => {
  const { passage } = props;
  const classes = useStyles();
  const { label, verses } = passage;

  const VerseNumber = ({ number }) => <sup className={classes.verseNumber}>{number}&nbsp;</sup>

  return (
    <Card className={classes.card}>
      <Typography className={classes.title} variant="body2" color="textPrimary" component="p">
        {label}
      </Typography>
      <CardContent classes={{ root: classes.classContentRoot }}>
        {verses.map(verse => (
          <Typography
            key={verse.verse}
            className={classes.description}
            variant="body2"
            color="textPrimary"
            component="p"
          >
            <VerseNumber number={verse.verse}/> {verse.content}
          </Typography>
        ))}
      </CardContent>
    </Card>
  )
}

BiblePasssageCard.propTypes = {
  passage: PropTypes.object.isRequired
};

BiblePasssageCard.defaultProps = {
  isPrayerClickable: true
}

export default BiblePasssageCard;
