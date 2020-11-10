import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Card from './Card';
import ROUTES from '../constants/routes'

const useStyles = makeStyles(() => ({
  root: {
    margin: '10px 0',
    '& .MuiCardActionArea-root': {
      display: 'flex',
      '& img': {
        maxWidth: 100,
        maxHeight: 100,
        margin: 'auto',
      }
    }
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

export default function PlanCard({ plan, isPreview }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handlePlanClick = () => {
    if (isPreview) {
      return dispatch(push(ROUTES.PLAN_PREVIEW))
    }

    dispatch(push(ROUTES.PLAN.replace(':id', plan._id)));
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handlePlanClick}>
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

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5f/FoursquareLogo_150x150-01.png"
          alt="Foursquare logo"
        />
      </CardActionArea>
    </Card>
  )
}
