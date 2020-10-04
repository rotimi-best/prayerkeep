import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cardRoot: {
    margin: '10px 0'
  },
  title: {
    fontSize: 18
  },
  subtitle: {
    display: 'flex',
    marginBottom: 12,
    alignItems: 'center',
    '& > p': {
      marginRight: 10
    },
  },
  shortDescription: {
    fontSize: 14
  }
}));

export default function PlanCard({ plan }) {
  const classes = useStyles();

  return (
    <Card className={classes.cardRoot}>
      <CardActionArea>
        <CardContent>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">
            {plan.title}
          </Typography>
          <div className={classes.subtitle}>
            <Typography color="textSecondary">
              By {plan.author}
            </Typography>
            <Typography color="textSecondary">
              {plan.prayedBy} prayed
            </Typography>
          </div>
          <Typography className={classes.shortDescription} variant="body1" color="subtitle" component="p">
            {plan.shortDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
