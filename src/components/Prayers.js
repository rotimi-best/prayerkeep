import React from 'react';
import PropTypes from 'prop-types';
import { Container, CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Prayer from './Prayer';

const styles = theme => ({
  containerRoot: {
    paddingLeft: 5,
    paddingRight: 5
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
  },
});

const prayers = [
  {
    _id: "someId1",
    description: "Father, I come before you today, please forgive me and every user of this platform from every sin of drug addiction, sex addiction, e.t.c, committed against the body and against you, in Jesus’ Name",
    answered: false,
    start: Date.now(),
    end: Date.now(),
    creator: {
      _id: "someId",
      userId: "",
      email: "",
      name: "Rotimi Best",
      pictureUrl: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2596302853931584&height=50&width=50&ext=1581187978&hash=AeRutKbKhgJO3BiM",
      lastDatePrayed: Date.now(),
      streak: 0
    },
    owner: {
      _id: "someId",
      userId: "",
      email: "",
      name: "Rotimi Best",
      pictureUrl: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2596302853931584&height=50&width=50&ext=1581187978&hash=AeRutKbKhgJO3BiM",
      lastDatePrayed: Date.now(),
      streak: 0
    },
    lastDatePrayed: Date.now(),
    prayerList: [
      {
        key: 1,
        title: "Spiritual",
      },
      {
        key: 2,
        title: "Financial",
      },
      {
        key: 3,
        title: "Relationship",
      },
      {
        key: 4,
        title: "Unanswered",
      },
      {
        key: 5,
        title: "Answered",
      },
    ]
  },
  {
    _id: "someId2",
    description: "Heavenly father, thank you for the forgiveness of sin and your mercy upon my life each day. Glorious God, you alone deserve my praise let my life be daily filled with your praise, in Jesus’ Name",
    answered: false,
    start: Date.now(),
    end: Date.now(),
    creator: {},
    owner: {},
    lastDatePrayed: Date.now(),
    prayerList: [
      {
        key: 1,
        title: "Spiritual",
      },
      {
        key: 3,
        title: "Relationship",
      },
      {
        key: 5,
        title: "Answered",
      },
    ]
  },
  {
    _id: "someId3",
    description: "Heavenly father, Father, I’m using this medium to pray for all hard drugs addicts, cleanse all of their wounds, brokenness and depressions. Redeem and restore their lives to live and love freely, in Jesus’ Name",
    answered: false,
    start: Date.now(),
    end: Date.now(),
    creator: {},
    owner: {},
    lastDatePrayed: Date.now(),
    prayerList: [
      {
        key: 3,
        title: "Relationship",
      },
      {
        key: 5,
        title: "Answered",
      },
    ]
  },
]

const Prayers = props => {
  const { classes } = props;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container
        maxWidth="sm"
        classes={{
          root: classes.containerRoot
        }}
      >
        <CssBaseline />
        {prayers.map(prayer => <Prayer key={prayer._id} prayer={prayer} />)}
        {prayers.map(prayer => <Prayer key={prayer._id} prayer={prayer} />)}
      </Container>
    </main>
  )
}

Prayers.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(withStyles(styles)(Prayers));