import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import Tooltip from '@material-ui/core/Tooltip';

const CollectionBox = ({ collectionBoxRoot, collection, dispatch }) => {
  const {
    _id,
    title,
    color,
    prayers,
    shared,
    people,
    owner
  } = collection;
  const openCollection = () => {
    dispatch(push(`/collection/${_id}`))
  }

  return (
    <Paper className={collectionBoxRoot} variant="outlined" onClick={openCollection}>
      {shared ? (
        <FolderSharedIcon style={{ color: color || '' }}/>
      ) : (
        <FolderIcon style={{ color: color || '' }}/>
      )}
      <Tooltip title={title} aria-label={title}>
        <span>
          <Typography variant="body2" color="textPrimary" component="p">
            {/* {title.length >= 20 ? `${title.slice(0, 20)}...` : title} */}
            {title}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p">
            {owner?.googleAuthUser?.name}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" color="textSecondary" component="p">
              {prayers?.length} {prayers?.length > 1 ? 'prayers' : 'prayer'}
            </Typography>
              <span style={{ margin: '0 5px'}}>•</span>
            <Typography variant="caption" color="textSecondary" component="p">
              {people?.length} {people?.length > 1 ? 'people' : 'person'}
            </Typography>
          </div>
        </span>
      </Tooltip>
    </Paper>
  )
}

CollectionBox.propTypes = {
  dispatch: PropTypes.func.isRequired,
  collectionBoxRoot: PropTypes.string.isRequired,
  collection: PropTypes.object.isRequired,
};

export default connect()(CollectionBox);