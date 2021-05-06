import React from 'react';
import { useMediaQuery } from 'react-responsive';
import ReactMarkdown from 'react-markdown';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Carousel from 'react-material-ui-carousel';

import Empty from '../Empty';
import findMeaning from './functions/findMeaning';
import getAllWords from './functions/getAllWords';
import useStyles from './styles';

const options = getAllWords();

const RenderSearchResult = ({ data, type, classes }) => {
  if (type === 'text') {
    return (
      <Paper
        variant="outlined"
        className={classes.paper}
        elevation={2}
      >
        <ReactMarkdown>
          {data}
        </ReactMarkdown>
      </Paper>
    )
  }

  if (type === 'image') {
    return (
      <Carousel
        navButtonsAlwaysVisible={data?.length > 1}
        navButtonsAlwaysInvisible={data?.length === 1}
        animation="fade"
        autoPlay={false}
      >
        {data.map((item, index) => (
          <Paper
            key={`image-${index}`}
            variant="outlined"
            className={classes.paper}
            elevation={2}
          >
            <img src={item} alt={`Translation images`}/>
          </Paper>
        ))}
      </Carousel>
    )
  }

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
  );

}

export default function DreamDictionary() {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const searchResult = value ? findMeaning(value.value) : {};

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1280px)'
  });

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
          getOptionLabel={(option) => option.label}
          onChange={(event, newValue) => {
            setValue(newValue);
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
        <RenderSearchResult
          data={searchResult.data}
          type={searchResult.type}
          classes={classes}
        />
      </Container>
    </main>
  )

}