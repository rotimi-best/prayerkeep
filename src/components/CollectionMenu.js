import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { push } from 'connected-react-router';
import { connect } from "react-redux";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import CollectionMenuItem from './CollectionMenuItem';

const styles = theme => ({
  root: {
    margin: '10px 0'
  },
  title: {
    fontWeight: 'bold'
  }
});

const CollectionMenu = props => {
  const {
    classes,
    collections,
    dispatch,
    userPictureUrl
  } = props;
  const menuData = collections.map(collection =>
    <CollectionMenuItem
      key={collection._id}
      collection={collection}
      userPictureUrl={userPictureUrl}
    />
  );

  const onSelect = id => {
    dispatch(push(`/collection/${id}`))
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Collections</Typography>
      <ScrollMenu
        alignCenter={false}
        data={menuData}
        onSelect={onSelect}
      />
    </div>
  );
}

const matchStateToProps = state => ({
  collections: state.collections.allCollection,
  userPictureUrl: state.authentication.user
    && state.authentication.user.picture,
});

export default connect(matchStateToProps)(withStyles(styles)(CollectionMenu));