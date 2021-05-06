const supportedAlphabets = ['a', 'u', 'v', 'w', 'x', 'y', 'z'];
let meanings = {};

for (const alphabet of supportedAlphabets) {
  meanings = {
    ...meanings,
    ...require(`../constants/meanings/${alphabet}`).default
  }
}
console.log(meanings)
export default meanings;
