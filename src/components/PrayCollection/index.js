import React from 'react';
import { useSelector } from 'react-redux';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import ReactPlayer from "react-player/lazy";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import PlayIcon from "@material-ui/icons/PlayArrow";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import PauseIcon from "@material-ui/icons/Pause";

import DialogActionButton from "../BorderedButton";
import PrayerCard from '../PrayerCard';
import PreviousArrow from '../PreviousArrow';
import NextArrow from '../NextArrow';
import PlayTimeProgress from './PlayTimeProgress';
// import Empty from '../Empty';

import constants from "./constants";
import useStyles from "./style";

const anotations = {
  '00:00:00': {
    type: constants.ANOTATION_TYPE.WORHSIP
  },
  '00:13:20': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2a5be22fe656b3ae04eef'
  },
  '00:14:03': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2aaf544ae9977f3a58588'
  },
  '00:14:20': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2ab1644ae9977f3a58589'
  },
  '00:14:40': {
    type: constants.ANOTATION_TYPE.WORHSIP,
    value: '5fc2ab2d44ae9977f3a5858a'
  },
  '00:22:47': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2ab4644ae9977f3a5858b'
  },
  '00:35:02': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2ab6144ae9977f3a5858c'
  },
  '00:35:14': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2ab7244ae9977f3a5858d'
  },
  '00:35:46': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2abbe44ae9977f3a5858e'
  },
  '00:35:57': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2abce44ae9977f3a5858f'
  },
  '00:36:51': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2abe044ae9977f3a58590'
  },
  '01:00:04': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2ac0244ae9977f3a58591'
  },
  '01:01:20': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2ac1544ae9977f3a58592'
  },
  '01:06:05': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2ac2744ae9977f3a58593'
  },
  '01:13:18': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2ac3844ae9977f3a58594'
  },
  '01:32:52': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2ac5244ae9977f3a58595'
  },
  '01:37:56': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2ac6344ae9977f3a58596'
  },
  '01:52:24': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2ac7744ae9977f3a58597'
  },
  '01:54:00': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2ac8b44ae9977f3a58598'
  },
  '01:59:54': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fc2ac9d44ae9977f3a58599'
  }
}
const anotationValues = Object.values(anotations);
const anotationKeys = Object.keys(anotations);

let player;

// function Render

function toSeconds(timeStamp) {
  const [hour, minutes, seconds] = timeStamp.split(':').map(a => Number(a));
  return ((hour * (60 * 60) + (minutes * 60) + seconds))
}

export const PrayCollection = (props) => {
  const { prayers } = props;
  const [open, setOpen] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [progress, setProgress] = React.useState({});
  const [isVideoLoading, setIsVideoLoading] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const { userId } = useSelector(state => ({
    userId: state.authentication?.user?.userId,
  }));
  const fontSize = "large";

  const handlePeopleOpen = () => {}
  const handlePausePlay = () => {
    setIsPlaying(!isPlaying);
  }
  const handleChatOpen = () => {

  }
  const onAudioReady = () => {
    console.log('audio is ready to play')
    setIsVideoLoading(false)
  }
  const valuetext = (value) => value;

  const handleOpen = () => {
    setOpen(!open)
  }
  const handleProgress = (progressProps) => {
    console.log('progressProps', progressProps)
    setProgress(progressProps)
  }
  const handleDuration = (duration) => {
    console.log('onDuration', duration)
    setDuration(duration)
  }

  const handleArrow = direction => () => {
    if (direction === 'prev') {
      return setStep(step => {
        if (step - 1 < 0) return step;
        const nextStep = step - 1;
        player.seekTo(toSeconds(anotationKeys[nextStep]));
        return nextStep;
      })
    }

    setStep(step => {
      if (step + 1 === prayers.length) return step;
      const nextStep = step + 1;
      player.seekTo(toSeconds(anotationKeys[nextStep]));

      return nextStep;
    })
  }
  const handleEnded = () => {
    console.log('onEnded')
  }

  const onBuffer = () => {
    console.log('started buffering')
    setIsVideoLoading(true)
  }

  const onBufferEnd = () => {
    console.log('ended buffering')
    setIsVideoLoading(false)
  }

  const ref = _player => {
    player = _player
  }

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className={classes.startPraying}
      >
        <PlayIcon />Start praying
      </Button>
      <Dialog
        fullScreen={fullScreen}
        maxWidth="xs"
        fullWidth={true}
        open={open}
        // onClose={handleOpen}
        className={classes.root}
        aria-labelledby="prayer-request-modal"
      >
        <DialogContent className={classes.dialogContent} dividers>
          <div className={classes.header}>
            <DialogActionButton label="Close" onClick={handleOpen} />
          </div>

          {step - 1 >= 0 && <PreviousArrow
            handleClick={handleArrow('prev')}
            overideClassName={classes.previousArrow}
          />}
          {step + 1 !== anotationValues.length && <NextArrow
            handleClick={handleArrow('next')}
            overideClassName={classes.nextArrow}
          />}

          <div className={classes.presentationRoot}>
            {anotationValues[step]?.type === constants.ANOTATION_TYPE.PRAYER ? (
              <PrayerCard
              userId={userId}
              prayer={prayers.find(p => p._id === anotationValues[step]?.value)}
              isPrayerClickable={false}
              showCollectionTags={false}
              hideCreator
            />) : (
              <div>
                WORHSIP
              </div>
            )}
          </div>

          <div className={classes.playerRoot}>
            <Slider
              defaultValue={0}
              getAriaValueText={valuetext}
              aria-labelledby="audio-progress-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={anotationValues.length}
            />

            <ReactPlayer
              ref={ref}
              style={{
                display: "none"
              }}
              stopOnUnmount={false}
              playing={isPlaying}
              onReady={onAudioReady}
              onBuffer={onBuffer}
              onBufferEnd={onBufferEnd}
              onProgress={handleProgress}
              onDuration={handleDuration}
              onEnded={handleEnded}
              url="https://www.youtube.com/watch?v=BKZZYu3Z0kQ&t=1"
            />

            <div className={classes.actions}>
              <IconButton aria-label="people" onClick={handlePeopleOpen}>
                <PeopleOutlineIcon fontSize={fontSize} />
              </IconButton>
              <div className={classes.pausePlayAction}>
                <IconButton aria-label="pause-play" onClick={handlePausePlay}>
                  {isVideoLoading ? (
                    <CircularProgress size={20} />
                  ) : isPlaying ? (
                    <PauseIcon fontSize={fontSize} />
                  ) : (
                    <PlayIcon fontSize={fontSize} />
                  )}
                </IconButton>
                <PlayTimeProgress
                  elapsed={duration * progress.played}
                  duration={duration}
                />
              </div>
              <IconButton aria-label="chat" onClick={handleChatOpen}>
                <ChatBubbleOutlineRoundedIcon fontSize={fontSize} />
              </IconButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default PrayCollection;
