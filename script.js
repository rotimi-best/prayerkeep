const fs = require('fs')

const dirName = `${__dirname}/src/constants/bible`;

fs.readdir(dirName, (err, files) => {
  if (err) return console.log(error);
  for (const file of files) {
    // const file = files[0];
    const fileName = dirName + `/${file}`;
    const fileContent = JSON.parse(fs.readFileSync(fileName, 'utf8'))
    fileContent.chapters = fileContent.chapters.map(chapter => chapter['verses'].length)
    // console.log('fileContent', fileContent)
    fs.writeFileSync(fileName, JSON.stringify(fileContent))
  }
})

