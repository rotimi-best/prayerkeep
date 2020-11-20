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
import PlayIcon from "@material-ui/icons/PlayArrow";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import PauseIcon from "@material-ui/icons/Pause";

import DialogActionButton from "../BorderedButton";
import PrayerCard from '../PrayerCard';

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
    "description":"I commit my masters degree unto God's hand. May I receive favour before my lecturers, understanding of the lecture material and wisdom in what to say",
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
      }
    ]
  }
]

export const PrayCollection = () => {
  const [open, setOpen] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(false);
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
  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth="sm"
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

        <div className={classes.presentationRoot}>
          <PrayerCard
            userId={userId}
            prayer={prayers[0]}
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
            style={{
              display: "none"
            }}
            playing={isPlaying}
            onReady={onAudioReady}
            url="https://youtu.be/N7esLepaaqw"
          />

          <div className={classes.actions}>
            <IconButton aria-label="people" onClick={handlePeopleOpen}>
              <PeopleOutlineIcon fontSize={fontSize} />
            </IconButton>
            <IconButton aria-label="pause-play" onClick={handlePausePlay}>
              {isVideoLoading ? (
                <CircularProgress size={20} />
              ) : isPlaying ? (
                <PauseIcon fontSize={fontSize} />
              ) : (
                <PlayIcon fontSize={fontSize} />
              )}
            </IconButton>
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
