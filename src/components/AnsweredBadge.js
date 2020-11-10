import React from 'react'
import { withStyles } from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';

export default withStyles(() => ({
  root: {
    borderRadius: 5,
    fontSize: 13,
    backgroundColor: '#6bc17d',
    width: 'fit-content',
    padding: '2px 5px',
    display: 'flex',
    alignItems: 'center',
    color: 'white'
  }
}))(function AnsweredBadge(props) {
  return (
    <div className={props.classes.root}>
      <DoneAllIcon fontSize="small"/> Answered
    </div>
  );
});
