import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

import PreviousArrow from '../PreviousArrow';
import NextArrow from '../NextArrow';
import StoryViewer from "./StoryViewer";
import useStyles from "./style";

const ArrowLeft = <PreviousArrow overideClassName="arrow-prev" />
const ArrowRight = <NextArrow overideClassName="arrow-next" />

const User = (props) => {
  const { classes, src, userName } = props;

  return (
    <div className={classes.userRoot}>
      <Avatar
        alt={userName}
        src={src}
      />
    </div>
  )
}

export default function Stories(props) {
  const classes = useStyles();
  const history = useHistory();
  const {stories, isMobile } = useSelector(state => ({
    isMobile: state.sidebar.isMobile,
    stories: state.feed.stories,
    userName: state.authentication.user && state.authentication.user.name,
    userPictureUrl: state.authentication.user?.picture,
  }));

  const handleClick = id => () => {
    console.log('clicking')
    if (!id) return;
    history.push(`/story/${id}`);
  }

  const menuData = stories.map(story => (
    <div key={story._id} className={classes.userWrapper}>
      <User
        classes={classes}
        userName={story?.creator?.googleAuthUser?.name}
        src={story?.creator?.googleAuthUser?.picture}
      />
      <CircularProgress onClick={handleClick(story._id)} variant="static" value={100} size={50} thickness={2} className={classes.isUploading} />
    </div>
  ))

  return (
    <div className={classes.root}>
      {/* {isUploading && <div className={classes.userWrapper}>
        <User
          classes={classes}
          userName={userName}
          src={userPictureUrl}
        />
        <CircularProgress size={50} thickness={2} className={classes.isUploading} />
      </div>} */}
      {stories.length ? (
        <ScrollMenu
          alignCenter={false}
          data={menuData}
          arrowLeft={!isMobile && ArrowLeft}
          arrowRight={!isMobile && ArrowRight}
        />
      ) : (
        <span>No stories uploaded yet</span>
      )}
      <StoryViewer />
    </div>
  )
}
