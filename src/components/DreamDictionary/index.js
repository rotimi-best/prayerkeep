import React from 'react';
import { useMediaQuery } from 'react-responsive';
// import ReactMarkdown from 'react-markdown';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import Carousel from 'react-material-ui-carousel';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

import Empty from '../Empty';
import findMeaning from './functions/findMeaning';
import images from './constants/images';
import getAllWords from './functions/getAllWords';
import useStyles from './styles';

const options = getAllWords();

const SearchResult = (props) => {
  const { imageUrl, onNext, onPrev, classes } = props;
  const [isLoading, setIsLoading] = React.useState(true);

  let content;
  if (/^http/.test(imageUrl)) {
    content = <img
      src={imageUrl}
      alt={`Translation images`}
      ref={(input) => {
        // onLoad replacement for SSR
        if (!input) { return; }
        const img = input;
    
        const updateFunc = () => {
          setIsLoading(false);
        };
        img.onload = updateFunc;
        if (img.complete) {
          updateFunc();
        }
      }}
      
    />
  } 
  // else if (!!data) {
  //   content = (
  //     <ReactMarkdown>
  //       {data}
  //     </ReactMarkdown>
  //   );
  // }

  if (!content) {
    return (
      <Paper
        variant="outlined"
        className={classes.paper}
        elevation={2}
      >
        <Empty
          type="search"
          text="No search result"
        />
      </Paper>
    )
  }

  return (
    <Paper
      variant="outlined"
      className={`${classes.paper} ${classes.searchResult}`}
      elevation={2}
    >
      <IconButton onClick={onNext} className={`nextButton`}>
        <ArrowForwardIos />
      </IconButton>

      <IconButton onClick={onPrev}  className={`prevButton`}>
        <ArrowBackIosIcon />
      </IconButton>
      {isLoading ? <CircularProgress /> : content}
    </Paper>
  )
}

export default function DreamDictionary() {
  const classes = useStyles();
  const [value, setValue] = React.useState({});
  const [inputValue, setInputValue] = React.useState('');
  const [searchResult, setSearchResult] = React.useState({});

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1280px)'
  });
  const onNextClick = () => {
    const {page } =  searchResult;
    const nextPage = parseInt(page) + 1;
    const nextPageImage = images[`${nextPage}`];

    if (nextPageImage) {
      setSearchResult({
        page: `${nextPage}`,
        imageUrl: nextPageImage
      })
    }
  }
  const onPrevClick = () => {
    const {page } =  searchResult;
    const prevPage = parseInt(page) - 1;
    const prevPageImage = images[`${prevPage}`];

    if (prevPageImage) {
      setSearchResult({
        page: `${prevPage}`,
        imageUrl: prevPageImage
      })
    }
    
  }

  return (
    <main className={classes.root}>
      {isDesktopOrLaptop && <div className={classes.toolbar} />}
      <CssBaseline />
      <Container
        maxWidth="sm"
        classes={{
          root: classes.containerRoot
        }}
      >
        <Autocomplete
          freeSolo
          disableClearable
          id="search-dictionary"
          value={value}
          getOptionLabel={(option) => option.label || ''}
          onChange={(event, newValue) => {
            setValue(newValue);
            setSearchResult(newValue.value ? findMeaning(newValue.value) : {})
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
        />
        <SearchResult
          imageUrl={searchResult.imageUrl}
          classes={classes}
          onNext={onNextClick}
          onPrev={onPrevClick}
        />
      </Container>
    </main>
  )

}