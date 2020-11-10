import React from 'react'
import { withStyles } from '@material-ui/core';

export default withStyles(() => ({
  root: {
    borderRadius: 50,
    fontWeight: '400',
    backgroundColor: 'rgba(0,0,0,.07)',
    color: '#626262',
    verticalAlign: 'baseline',
    padding: '0px 7px',
    fontSize: 13
  }
}))(function Badge(props) {
  return (
    <div className={props.classes.root + ' badge'}>
      {props.value}
    </div>
  )
});
