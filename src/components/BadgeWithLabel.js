import React from 'react'
import { withStyles } from '@material-ui/core';
import Badge from './Badge';

export default withStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  }
}))(function BadgeWithLabel(props) {
  return (
    <div className={props.classes.root}>
      {props.label}&nbsp;<Badge value={props.value}/>
    </div>
  )
});
