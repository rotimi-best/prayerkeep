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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';

import getBooks from '../../helpers/getBooks';
import getChapters from '../../helpers/getChapters';
import useStyles from './style';

const books = getBooks();

const Books = React.memo(props => (
  <FixedSizeList height={330} width={400} itemSize={50} itemCount={books.length + 1}>
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

const GUTTER_SIZE = 5;
const COLUMN_WIDTH = 71;
const ELEMENT_PER_COLUMN = 5;

const NumberList = ({ classes, itemSize, onClick }) => (
  <Grid
    className="Grid"
    columnCount={ELEMENT_PER_COLUMN}
    columnWidth={COLUMN_WIDTH + GUTTER_SIZE}
    height={330}
    innerElementType={innerElementType}
    rowCount={Math.ceil(itemSize / ELEMENT_PER_COLUMN)}
    rowHeight={50}
    width={400}
  >
    {({ columnIndex, rowIndex, style }) => {
      console.log("itemSize", itemSize)
      const index = ((rowIndex * ELEMENT_PER_COLUMN) + 1) + columnIndex;
      if (index > itemSize) {
        return null;
      }
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
          <IconButton key={`chapter-${rowIndex}-${columnIndex}`} className={classes.clickableNumber} onClick={onClick(index)}>
            {index}
          </IconButton>
        </div>
      )
    }}
  </Grid>
);

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

  const handleTabChange = (event, newValue) => {
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
      itemSize={chapter.chapters[chapter.selected - 1]}
      onClick={handleChapterClick}
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
          {!!chapter.book
            ? chapter.selected
              ? `${chapter.book}: ${chapter.selected}`
              : chapter.book
            : `Bible verse picker`
          }
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
              <Tab label="VERSES" {...a11yProps(2)} />
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
          <Button autoFocus onClick={handleDialog} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
