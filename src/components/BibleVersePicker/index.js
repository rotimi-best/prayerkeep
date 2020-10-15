import React from 'react';
import { FixedSizeList, FixedSizeGrid as Grid } from 'react-window';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from './DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import DoneIcon from '@material-ui/icons/Done';

import getBooks from '../../helpers/getBooks';
import formatVerses from '../../helpers/formatVerses';
import getChapters from '../../helpers/getChapters';
import useStyles from './style';

const books = getBooks();

const GUTTER_SIZE = 5;
const COLUMN_WIDTH = 71;
const ELEMENT_PER_COLUMN = 5;
const HEIGHT = 330;
const WIDTH = 400;

const Books = React.memo(props => (
  <FixedSizeList height={HEIGHT} width={WIDTH} itemSize={50} itemCount={books.length + 1}>
    {({ index, style }) => {
      const book = books[index];
      if (!book) return null;
      return (
        <ListItem key={index} style={style} button onClick={props.handleBookSelected(book)}>
          <ListItemText
            primary={book}
          />
        </ListItem>
      )
    }}
  </FixedSizeList>
))

const NumberList = React.memo(({ classes, itemSize, onClick, selected }) => (
  <Grid
    columnCount={ELEMENT_PER_COLUMN}
    columnWidth={COLUMN_WIDTH + GUTTER_SIZE}
    height={HEIGHT}
    innerElementType={innerElementType}
    rowCount={Math.ceil(itemSize / ELEMENT_PER_COLUMN)}
    rowHeight={50}
    width={WIDTH}
  >
    {({ columnIndex, rowIndex, style }) => {
      const index = ((rowIndex * ELEMENT_PER_COLUMN) + 1) + columnIndex;
      if (index > itemSize) {
        return null;
      }
      const colorClassName = Array.isArray(selected) && selected.includes(index)
        ? classes.selectedNumber
        : '';
      return (
        <div
          className={classes.numberList}
          style={{
            ...style,
            left: style.left + GUTTER_SIZE,
            top: style.top + GUTTER_SIZE,
            width: style.width - GUTTER_SIZE,
            height: style.height - GUTTER_SIZE
          }}
        >
          <IconButton key={`chapter-${rowIndex}-${columnIndex}`} className={classes.clickableNumber + ` ${colorClassName}`} onClick={onClick(index)}>
            {index}
          </IconButton>
        </div>
      )
    }}
  </Grid>
));

const innerElementType = React.forwardRef(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      paddingLeft: GUTTER_SIZE,
      paddingTop: GUTTER_SIZE
    }}
    {...rest}
  />
));

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
    value: index
  };
}

export default function BibleVersePicker() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [tabValue, setTabValue] = React.useState(0);
  const [chapter, setChapter] = React.useState({
    book: '',
    chapters: [],
    selected: '',
  });
  const [verses, setVerses] = React.useState([]);
  const title = getTitle();

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      setChapter({
        ...chapter,
        chapters: []
      })
      setVerses([])
    }
    setTabValue(newValue);
  };

  const handleDialog = () => {
    setOpen(open => !open);
  };

  const handleBookSelected = (book) => async () => {
    setTabValue(1)
    const chapter = await getChapters(book.replace(/\s/g, ''));
    setChapter({
      ...chapter.default
    });
  };

  const handleChapterClick = chapterNumber => () => {
    setChapter({
      ...chapter,
      selected: chapterNumber
    });
    setTabValue(2)
    setVerses([])
  }

  const handleVersesClick = verseNumber => () => {
    setVerses([
      ...verses,
      verseNumber
    ]);
    // handleDialog()
  }

  function getTitle() {
    if (chapter.book) {
      let title = chapter.book
      if (chapter.selected) {
        let formattedChapter = title + ` ${chapter.selected}`
        if (verses?.length) {
          const sortedVerses = verses.sort((a, b) => a - b);
          return formattedChapter + `: ${formatVerses(sortedVerses)} (KJV)`;
        }
        return formattedChapter + ' (KJV)';
      }
      return title + ' (KJV)';
    }

    return 'Bible verse picker';
  }

  const tabs = [
    <Books
      handleBookSelected={handleBookSelected}
    />,
    <NumberList
      classes={classes}
      itemSize={chapter.chapters.length}
      onClick={handleChapterClick}
    />,
    <NumberList
      classes={classes}
      selected={verses}
      itemSize={chapter.chapters[chapter.selected - 1]}
      onClick={handleVersesClick}
    />
  ]

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleDialog}>
        Open dialog
      </Button>
      <Dialog
        onClose={handleDialog}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{
          paper: classes.dialogRoot
        }}
      >
        <DialogTitle id="customized-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <AppBar position="sticky" color="inherit">
            <Tabs
              value={tabValue}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
              aria-label="bible verse picker"
              variant="fullWidth"
            >
              <Tab label="BOOKS" {...a11yProps(0)} />
              <Tab label="CHAPTERS" {...a11yProps(1)} disabled={!chapter.book}/>
              <Tab label="VERSES" {...a11yProps(2)} disabled={!chapter.book || !chapter.selected}/>
            </Tabs>
          </AppBar>
          <div
            role="tabpanel"
            id={`scrollable-tabpanel`}
            aria-labelledby={`scrollable-tab`}
            style={{
              marginTop: 10
            }}
          >
            {tabs[tabValue]}
          </div>
        </DialogContent>
        <DialogActions>
          <Fab color="primary" onClick={handleDialog} aria-label="save-verse-selection" disabled={!verses?.length}>
            <DoneIcon />
          </Fab>
        </DialogActions>
      </Dialog>
    </div>
  );
}
