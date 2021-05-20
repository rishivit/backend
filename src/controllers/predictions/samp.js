const path = require('path');
const fs = require('fs');
// const config = require('../../config/config');

const testFolder = path.join(__dirname, '../../dataset/', '/', 'dark');
const files = [];
fs.readdirSync(testFolder).forEach((file) => {
  files.push(file);
});

console.log(files.slice(0, 28));

// module.exports = {
//     getPredictionFile,
// };
