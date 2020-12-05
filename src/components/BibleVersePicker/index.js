import React from 'react';
import { FixedSizeList, FixedSizeGrid as Grid } from 'react-window';
import { useMediaQuery } from "react-responsive";
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
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';

import getBooks from '../../helpers/getBooks';
import formatVerses from '../../helpers/formatVerses';
import getChapters from '../../helpers/getChapters';
import useStyles from './style';

const books = getBooks();

const GUTTER_SIZE = 5;
const COLUMN_WIDTH = 50;
const ELEMENT_PER_COLUMN = 5;
const HEIGHT = 330;
const WIDTH = 300;

const Books = React.memo(props => {
  const searchRef = React.useRef(null);
  const [search, setSearch] = React.useState('');
  const bookList = books.filter(book => RegExp(`^${search.toLowerCase()}`).test(book.toLowerCase()))

  React.useEffect(() => {
    return searchRef?.current?.focus();
  }, []);

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  }

  return (
    <React.Fragment>
      <TextField
        id="filter-books"
        ref={searchRef}
        label="Filter books..."
        value={search}
        variant="outlined"
        style={{
          width: '100%',
          margin: 0
        }}
        onChange={onSearchChange}
      />
      <FixedSizeList height={275} width={WIDTH} itemSize={50} itemCount={bookList.length + 1}>
        {({ index, style }) => {
          const book = bookList[index];
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
    </React.Fragment>
  )
})

const NumberList = React.memo(({ classes, itemSize, onClick, selected, multiSelectable }) => (
  <React.Fragment>
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
  </React.Fragment>
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

async function getDefaultState(passage) {
  if (!passage) {
    return {
      book: '',
      chapters: [],
      selected: '',
      verses: [],
      tabValue: 0
    }
  }

  const isMultipleBooks = /^\d/.test(passage);
  const passageFragments = passage.split(' ');
  const book = isMultipleBooks ? passageFragments[0] + ` ${passageFragments[1]}` : passageFragments[0];
  const selected = passageFragments[isMultipleBooks ? 2 : 1].replace(':', '');
  const rawVerses = passageFragments.slice(isMultipleBooks ? 3 : 2, passageFragments.length - 1);
  const verses = [];

  const chapter = await getChapters(book.replace(/\s/g, ''));

  for (const rawVerse of rawVerses) {
    const number = rawVerse.replace(',', '');
    if (number.includes('-')) {
      const [startNo, endNo] = number.split('-');
      for (let i = parseInt(startNo); i <= parseInt(endNo); i++) {
        verses.push(i)
      }
    } else {
      verses.push(parseInt(number))
    }
  }

  return {
    ...chapter.default,
    selected,
    verses,
    tabValue: 2
  }
}

export default function BibleVersePicker(props) {
  const {
    value,
    visible,
    onComplete,
    handleVisibility
  } = props;

  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const [chapter, setChapter] = React.useState({
    book: '',
    chapters: [],
    selected: '',
  });
  const [verses, setVerses] = React.useState([]);
  const title = getTitle();
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)"
  });

  React.useEffect(() => {
    async function setDefaultState() {
      const defaultState = await getDefaultState(value);
      setChapter({
        book: defaultState.book,
        chapters: defaultState.chapters,
        selected: defaultState.selected,
      });
      setVerses([
        ...defaultState.verses
      ]);
      setTabValue(defaultState.tabValue);
    }

    if (visible) {
      setDefaultState()
    }
  }, [visible, value]);

  const handleComplete = () => {
    onComplete(title)
    setChapter({
      book: '',
      chapters: [],
      selected: '',
    });
    setVerses([])
    setTabValue(0)
  }

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      setChapter({
        book: '',
        chapters: [],
        selected: '',
      })
      setVerses([])
    }
    setTabValue(newValue);
  };

  const handleBookSelected = (book) => async () => {
    setTabValue(1)
    const chapter = await getChapters(book.replace(/\s/g, ''));
    setChapter({
      ...chapter.default
    });
  };

  const handleChapterClick = React.useCallback(chapterNumber => () => {
    setChapter(chapter => ({
      ...chapter,
      selected: chapterNumber
    }));
    setTabValue(2)
    setVerses([])
  }, [])

  const handleVersesClick = verseNumber => () => {
    setVerses(verses =>
      verses.includes(verseNumber)
        ? verses.filter(verse => verse !== verseNumber)
        : [...verses, verseNumber]
      );
    // handleVisibility()
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

  const tabs = React.useMemo(() => [
    <Books
      handleBookSelected={handleBookSelected}
    />,
    <NumberList
      classes={classes}
      selected={[chapter.selected]}
      itemSize={chapter.chapters.length}
      onClick={handleChapterClick}
    />,
    <NumberList
      classes={classes}
      selected={verses}
      itemSize={chapter.chapters[chapter.selected - 1]}
      onClick={handleVersesClick}
    />
  ], [verses, chapter.chapters, classes, chapter.selected, handleChapterClick])

  return (
    <div>
      <Dialog
        onClose={handleVisibility}
        aria-labelledby="customized-dialog-title"
        open={visible}
        fullScreen={isMobile}
        classes={{
          paper: classes.dialogRoot
        }}
      >
        <DialogTitle id="customized-dialog-title" onClick={handleVisibility}>
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
              centered
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
          >
            {tabs[tabValue]}
          </div>
        </DialogContent>
        <DialogActions>
          <Fab color="primary" onClick={handleComplete} aria-label="save-verse-selection" disabled={!verses?.length}>
            <DoneIcon />
          </Fab>
        </DialogActions>
      </Dialog>
    </div>
  );
}
