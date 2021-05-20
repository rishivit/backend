const express = require('express');
const path = require('path');
const cors = require('cors');
// const httpStatus = require('http-status');
// const authForFileServer = require('./middlewares/auth-fileserver');
// const predictionService = require('./services/prediction.service');
// const ApiError = require('./utils/ApiError');
// const catchAsync = require('./utils/catchAsync');

const fileserver = express();

// enable cors
fileserver.use(cors());
fileserver.options('*', cors());

// const checkOwnership = catchAsync(async (req, res, next) => {
//   const { userId } = req.params;
//   const message = await predictionService.getPredictionByUserId({ 'user': userId });
//   if (!message) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Prediction not found');
//   }
//   if (!(message.senderChatID === String(req.user._id) || message.receiverChatID === String(req.user._id))) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'You are not authorized to view this file');
//   }
//   next();
// });

// Protect routes
// fileserver.use('/files/*', authForFileServer('viewFiles'));

// Routes config
// fileserver.use('/files/audio', express.static(path.join(__dirname, '../files/audio')));

// fileserver.use('/files/predictions/:filename', checkOwnership);
// fileserver.get('/files/predictions/:filename', function (req, res) {
//   const { filename } = req.params;
//   ms.pipe(req, res, path.join(__dirname, '../files/audio', filename));
// });

const dir = path.join(__dirname, './dataset/');
fileserver.use(express.static(dir));

fileserver.get('/', (req, res) => {
  res.send('Fileserver working!');
});

module.exports = fileserver;
