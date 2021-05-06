import libArray from './libArray';

const options = [];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatWord(word) {
  return capitalizeFirstLetter(word).replace(/([a-z0-9])([A-Z])/g, '$1 $2')
}

export default () => {
  if (options.length) {
    return options;
  }

  libArray.arr.forEach(item => {
    item.container.words.forEach(word => {
      options.push({
        label: formatWord(word),
        value: word,
      })
    })
  });

  return options;
}
