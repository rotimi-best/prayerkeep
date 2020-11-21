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
// import Button from "@material-ui/core/Button";
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

const prayers = [
  {
    "answered":false,
    "start":1603670400000,
    "end":1606176000000,
    "lastDatePrayed":0,
    isAnanymous: true,
    "repeat":"daily",
    "passages":[
      "Hebrews 13: 6 (KJV)"
    ],
    "intercessors":["5f7ae79807424d39c8c4f535"],
    "_id":"5f96d0e870d5050072d0c65e",
    "description":"May I receive favour before my lecturers, understanding of the lecture material and wisdom in what to say. I commit my masters degree unto God's hand. May I receive favour before my lecturers, understanding of the lecture material and wisdom in what to say",
    "creator":"5e2dd2d7b0fec80080602b47",
    "owner":"5e2dd2d7b0fec80080602b47",
    "comments":[],
    "updatedAt":"2020-10-26T13:36:40.898Z",
    "createdAt":"2020-10-26T13:36:40.898Z",
    "__v":0,
    "public":false,
    "formattedPassages":[]
  },
  {
    "answered":false,
    "start":1603670400000,
    "end":1606176000000,
    "lastDatePrayed":0,
    isAnanymous: true,
    "repeat":"daily",
    "passages":[
      "Hebrews 13: 6 (KJV)"
    ],
    "intercessors":["5f7ae79807424d39c8c4f535"],
    "_id":"5f96d0e870d5050072d0c65e1",
    "description":"Material and wisdom in what to say. I commit my masters degree unto God's hand. May I receive favour before my lecturers, understanding of the lecture material and wisdom in what to say",
    "creator":"5e2dd2d7b0fec80080602b47",
    "owner":"5e2dd2d7b0fec80080602b47",
    "comments":[],
    "updatedAt":"2020-10-26T13:36:40.898Z",
    "createdAt":"2020-10-26T13:36:40.898Z",
    "__v":0,
    "public":false,
    "formattedPassages":[
      {
        "label":"Hebrews 13: 6 (KJV)",
        "verses":[
          {
            "verse":6,
            "content":"So that we may boldly say, The Lord is my helper, and I will not fear what man shall do unto me."
          }
        ]
      },
      {
        "label":"Hebrews 13: 6 (KJV)",
        "verses":[
          {
            "verse":6,
            "content":"So that we may boldly say, The Lord is my helper, and I will not fear what man shall do unto me."
          }
        ]
      },
    ]
  },
  {
    "answered":false,
    "start":1603670400000,
    "end":1606176000000,
    "lastDatePrayed":0,
    isAnanymous: true,
    "repeat":"daily",
    "passages":[
      "Hebrews 13: 6 (KJV)"
    ],
    "intercessors":["5f7ae79807424d39c8c4f535"],
    "_id":"5f96d0e870d505S0072d0c65e",
    "description":"I commit my masters degree unto God's hand. May I receive favour before my lecturers, understanding of the lecture material and wisdom in what to say. I commit my masters degree unto God's hand. May I receive favour before my lecturers, understanding of the lecture material and wisdom in what to say",
    "creator":"5e2dd2d7b0fec80080602b47",
    "owner":"5e2dd2d7b0fec80080602b47",
    "comments":[],
    "updatedAt":"2020-10-26T13:36:40.898Z",
    "createdAt":"2020-10-26T13:36:40.898Z",
    "__v":0,
    "public":false,
    "formattedPassages":[
      {
        "label":"Hebrews 13: 6 (KJV)",
        "verses":[
          {
            "verse":6,
            "content":"So that we may boldly say, The Lord is my helper, and I will not fear what man shall do unto me."
          }
        ]
      },
      {
        "label":"Hebrews 13: 6 (KJV)",
        "verses":[
          {
            "verse":6,
            "content":"So that we may boldly say, The Lord is my helper, and I will not fear what man shall do unto me."
          }
        ]
      },
      {
        "label":"Hebrews 13: 6 (KJV)",
        "verses":[
          {
            "verse":6,
            "content":"So that we may boldly say, The Lord is my helper, and I will not fear what man shall do unto me."
          }
        ]
      },
      {
        "label":"Hebrews 13: 6 (KJV)",
        "verses":[
          {
            "verse":6,
            "content":"So that we may boldly say, The Lord is my helper, and I will not fear what man shall do unto me."
          }
        ]
      },
      {
        "label":"Hebrews 13: 6 (KJV)",
        "verses":[
          {
            "verse":6,
            "content":"So that we may boldly say, The Lord is my helper, and I will not fear what man shall do unto me."
          }
        ]
      },
      {
        "label":"Hebrews 13: 6 (KJV)",
        "verses":[
          {
            "verse":6,
            "content":"So that we may boldly say, The Lord is my helper, and I will not fear what man shall do unto me."
          }
        ]
      },
    ]
  },
  {
    "answered":false,
    "start":1603670400000,
    "end":1606176000000,
    "lastDatePrayed":0,
    isAnanymous: true,
    "repeat":"daily",
    "passages":[
      "Hebrews 13: 6 (KJV)"
    ],
    "intercessors":["5f7ae79807424d39c8c4f535"],
    "_id":"5fS96d0e870d5050072d0c65e",
    "description":"May I receive favour before my lecturers, understanding of the lecture material and wisdom in what to say. I commit my masters degree unto God's hand. May I receive favour before my lecturers, understanding of the lecture material and wisdom in what to say",
    "creator":"5e2dd2d7b0fec80080602b47",
    "owner":"5e2dd2d7b0fec80080602b47",
    "comments":[],
    "updatedAt":"2020-10-26T13:36:40.898Z",
    "createdAt":"2020-10-26T13:36:40.898Z",
    "__v":0,
    "public":false,
    "formattedPassages":[]
  },
]

const anotations = {
  '0': {
    type: constants.ANOTATION_TYPE.WORHSIP
  },
  '20': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5f96d0e870d5050072d0c65e'
  },
  '40': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5f96d0e870d5050072d0c65e1'
  },
  '50': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5f96d0e870d505S0072d0c65e'
  },
  '60': {
    type: constants.ANOTATION_TYPE.WORHSIP,
  },
  '70': {
    type: constants.ANOTATION_TYPE.PRAYER,
    value: '5fS96d0e870d5050072d0c65e'
  },
}
const anotationValues = Object.values(anotations);
const anotationKeys = Object.keys(anotations);

let player;

// function Render

export const PrayCollection = () => {
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
  const valuetext = (value) => {
    return value;
  }
  const handleClose = () => {
    setOpen(false)
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
        player.seekTo(anotationKeys[nextStep]);
        return nextStep;
      })
    }

    setStep(step => {
      if (step + 1 === prayers.length) return step;
      const nextStep = step + 1;
      player.seekTo(anotationKeys[nextStep]);

      return nextStep;
    })
  }
  const handleEnded = () => {
    console.log('onEnded')
  }

  const ref = _player => {
    player = _player
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={handleClose}
      className={classes.root}
      aria-labelledby="prayer-request-modal"
    >
      <DialogContent className={classes.dialogContent} dividers>
        <div className={classes.header}>
          <DialogActionButton label="Close" onClick={handleClose} />
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
          <PrayerCard
            userId={userId}
            prayer={prayers[step]}
            isPrayerClickable={false}
            showCollectionTags={false}
          />
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
            max={10}
          />

          <ReactPlayer
            ref={ref}
            style={{
              display: "none"
            }}
            stopOnUnmount={false}
            playing={isPlaying}
            onReady={onAudioReady}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onEnded={handleEnded}
            url="https://www.youtube.com/watch?v=3nLjLI8LVns"
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
  );
}

export default PrayCollection;
