const supportedAlphabets = ['a', 'u', 'v', 'w', 'x', 'y', 'z'];
let meanings = {};

for (const alphabet of supportedAlphabets) {
  meanings = {
    ...meanings,
    ...require(`../constants/meanings/${alphabet}`).default
  }
}

export default meanings;
