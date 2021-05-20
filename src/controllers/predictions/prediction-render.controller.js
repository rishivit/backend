const path = require('path');
const fs = require('fs');
const config = require('../../config/config');

const getPredictionFile = (userId, type) => {
  const testFolder = path.join(__dirname, '../../dataset/', '/', type);
  const defaultDarkPreds = ['1ZG5HGKD8O.jpg', '3KUKA5L0J8.jpg', 'J9O7XKL3NF.jpg', 'LSHRRL5PY1.jpg', 'X187FA63HC.jpg'];
  const defaultLightPreds = ['VBF4WDHWQE.jpg', 'GHVCYAE6WE.jpg', '515TGF916Q.jpg', 'E4JFHPXT8O.jpg', 'EV77VKYW6H.jpg'];

  if (String(userId) === String(config.defaultUsers.userId)) {
    const randomNumbers = [];
    while (randomNumbers.length < 3) {
      const r = Math.floor(Math.random() * defaultDarkPreds.length);
      if (randomNumbers.indexOf(r) === -1) randomNumbers.push(r);
    }
    if (type === 'dark') {
      return [defaultDarkPreds[randomNumbers[0]], defaultDarkPreds[randomNumbers[1]], defaultDarkPreds[randomNumbers[2]]];
    }
    return [defaultLightPreds[randomNumbers[0]], defaultLightPreds[randomNumbers[1]], defaultLightPreds[randomNumbers[2]]];
  } else {
    const randomNumbers = [];
    const files = [];
    fs.readdirSync(testFolder).forEach((file) => {
      files.push(file);
    });
    while (randomNumbers.length < 3) {
      const r = Math.floor(Math.random() * files.length);
      if (randomNumbers.indexOf(r) === -1) randomNumbers.push(r);
    }
    // const random = Math.floor(Math.random() * files.length);
    return [files[randomNumbers[0]], files[randomNumbers[1]], files[randomNumbers[2]]];
  }
};

const getPredictionRecommendationsForUser = (userId, type) => {
  const testFolder = path.join(__dirname, '../../dataset/', '/', type);
  const defaultDarkPreds = [
    '06BNVMBSDK.jpg',
    '1ZG5HGKD8O.jpg',
    '3KUKA5L0J8.jpg',
    '5X5WM79B5H.jpg',
    '705JZYCF92.jpg',
    '9CZYHNLOB9.jpg',
    '9FQOSYCI9Y.jpg',
    'A5VVNBX9RV.jpg',
    'CTR3DKK3WT.jpg',
    'ER2DE05TGG.jpg',
    'FYI89A53JG.jpg',
    'GPN2YO9YP5.jpg',
    'GRE43RCRQA.jpg',
    'GYWP8AIUIW.jpg',
    'J6AUWWPJ9I.jpg',
    'J9O7XKL3NF.jpg',
    'LSHRRL5PY1.jpg',
    'MWJHWZ7FD1.jpg',
    'O92PXIT2JJ.jpg',
    'PDC3OM32NN.jpg',
    'PNCDYF21PD.jpg',
    'QJ83ZTA5RU.jpg',
    'R9ULQXDNR0.jpg',
    'RLYC4WCR5H.jpg',
    'RNUK03SIMM.jpg',
    'S1604VHSMZ.jpg',
    'S1C8QTOGFX.jpg',
    'X187FA63HC.jpg',
  ];

  const defaultLightPreds = [
    '0040QHOA0X.jpg',
    '08FROYMZZ7.jpg',
    '0VFQZFI8MJ.jpg',
    '515TGF916Q.jpg',
    '8CSADTT8F3.jpg',
    '9KZCIXHNFG.jpg',
    'AUZZWQXRZD.jpg',
    'B19QMWVGT0.jpg',
    'BAYGDLL35A.jpg',
    'BDVT9UJFVG.jpg',
    'C00HV9IUUW.jpg',
    'CSCXIF5KIP.jpg',
    'DQI638U5ZB.jpg',
    'E4JFHPXT8O.jpg',
    'EV77VKYW6H.jpg',
    'FRK5B4D910.jpg',
    'FVI2KF2BUQ.jpg',
    'GHVCYAE6WE.jpg',
    'J6ONWM7EBD.jpg',
    'KYPHT9A25V.jpg',
    'L3F3E294YD.jpg',
    'LN1XNHTR7O.jpg',
    'NJXU7L718D.jpg',
    'P9MIJFY5Z2.jpg',
    'TWJJUOJTPE.jpg',
    'U1COI3RPC9.jpg',
    'UO3RJ8PYE5.jpg',
    'UXRMZYO1SP.jpg',
  ];

  if (String(userId) === String(config.defaultUsers.userId)) {
    const randomNumbers = [];
    while (randomNumbers.length < 5) {
      const r = Math.floor(Math.random() * defaultDarkPreds.length);
      if (randomNumbers.indexOf(r) === -1) randomNumbers.push(r);
    }
    if (type === 'dark') {
      return [
        defaultDarkPreds[randomNumbers[0]],
        defaultDarkPreds[randomNumbers[1]],
        defaultDarkPreds[randomNumbers[2]],
        defaultDarkPreds[randomNumbers[3]],
        defaultDarkPreds[randomNumbers[4]],
      ];
    }
    return [
      defaultLightPreds[randomNumbers[0]],
      defaultLightPreds[randomNumbers[1]],
      defaultLightPreds[randomNumbers[2]],
      defaultLightPreds[randomNumbers[3]],
      defaultLightPreds[randomNumbers[4]],
    ];
  } else {
    const randomNumbers = [];
    const files = [];
    fs.readdirSync(testFolder).forEach((file) => {
      files.push(file);
    });
    while (randomNumbers.length < 5) {
      const r = Math.floor(Math.random() * files.length);
      if (randomNumbers.indexOf(r) === -1) randomNumbers.push(r);
    }
    // const random = Math.floor(Math.random() * files.length);
    return [
      files[randomNumbers[0]],
      files[randomNumbers[1]],
      files[randomNumbers[2]],
      files[randomNumbers[3]],
      files[randomNumbers[4]],
    ];
  }
};

const getPredictionRecommendationsForGeneral = (type) => {
  const testFolder = path.join(__dirname, '../../dataset/', '/', type);
  const randomNumbers = [];
  const files = [];

  fs.readdirSync(testFolder).forEach((file) => {
    files.push(file);
  });
  while (randomNumbers.length < 5) {
    const r = Math.floor(Math.random() * files.length);
    if (randomNumbers.indexOf(r) === -1) randomNumbers.push(r);
  }
  // const random = Math.floor(Math.random() * files.length);
  return [
    files[randomNumbers[0]],
    files[randomNumbers[1]],
    files[randomNumbers[2]],
    files[randomNumbers[3]],
    files[randomNumbers[4]],
  ];
};

module.exports = {
  getPredictionFile,
  getPredictionRecommendationsForUser,
  getPredictionRecommendationsForGeneral,
};
