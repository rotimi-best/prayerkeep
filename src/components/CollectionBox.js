import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';

const CollectionBox = ({ title, collectionBoxRoot, prayers }) => (
  <Paper className={collectionBoxRoot} variant="outlined">
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

CollectionBox.propTypes = {
  title: PropTypes.string.isRequired,
  collectionBoxRoot: PropTypes.string.isRequired,
  prayers: PropTypes.array.isRequired,
};

export default CollectionBox;