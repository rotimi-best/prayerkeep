import React from 'react';
import { useSelector } from 'react-redux';
import Stories from 'react-insta-stories';
import { useParams, useHistory } from 'react-router-dom';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

import useStyles from "./style";

export const StoryViewer = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const bodyRef = React.useRef();
  const { stories, isMobile } = useSelector(state => ({
    isMobile: state.sidebar.isMobile,
    stories: state.feed.stories,
  }));
  console.log('isMobile', isMobile)
  const handleClose = () => {
    history.push('/')
  }
  let story;
  if (id) {
    story = stories.find(story => story._id === id)
  }
  // console.log('bodyRef', bodyRef)
  // const height = bodyRef.current
  //   ? bodyRef.current.offsetHeight
  //   : 0;
  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth="xs"
      fullWidth={true}
      open={!!id}
      onClose={handleClose}
      className={classes.storyViewerRoot}
      aria-labelledby="prayer-request-modal"
    >
      <DialogContent className={classes.dialogContent} dividers>
        <div className={classes.header}>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.body} ref={bodyRef}>
          {story?.urls && <Stories stories={story.urls} width="100%" height={isMobile ? '94vh' : undefined}/>}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StoryViewer;
