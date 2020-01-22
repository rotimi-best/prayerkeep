import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';

const CollectionBox = ({ id, title, collectionBoxRoot, prayers, dispatch }) => {
  const openCollection = () => {
    dispatch(push(`/collection/${id}`))
  }

  return (
    <Paper className={collectionBoxRoot} variant="outlined" onClick={openCollection}>
      <FolderIcon />
      <span>
        <Typography variant="body2" color="textPrimary" component="p">
          {title.length >= 20 ? `${title.slice(0, 20)}...` : title}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="p">
          Has {prayers.length} prayer points
        </Typography>
      </span>
    </Paper>
  )
}

CollectionBox.propTypes = {
  title: PropTypes.string.isRequired,
  collectionBoxRoot: PropTypes.string.isRequired,
  prayers: PropTypes.array.isRequired,
};

export default connect()(CollectionBox);