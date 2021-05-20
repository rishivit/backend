const httpStatus = require('http-status');
const { pick } = require('lodash');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { predictionService } = require('../services');
const { getPredictionFile, getPredictionRecommendationsForUser, getPredictionRecommendationsForGeneral } = require('./predictions/prediction-render.controller');

const createPrediction = catchAsync(async (req, res) => {
  const predictions = [];
  const { userId, type } = req.body;
  const filenames = await getPredictionFile(userId, type);
  for (let index = 0; index < filenames.length; index++) {
    const prediction = await predictionService.createPrediction({
      userId,
      type,
      filename: filenames[index],
    });
    predictions.push(prediction);
  }
  res.status(httpStatus.CREATED).send(predictions);
});

const getPredictions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await predictionService.queryPredictions(filter, options);
  res.send(result);
});

const getPrediction = catchAsync(async (req, res) => {
  const prediction = await predictionService.getPredictionById(req.params.predictionId);
  if (!prediction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Prediction not found');
  }
  res.send(prediction);
});

const getPredictionByUserId = catchAsync(async (req, res) => {
  const prediction = await predictionService.getPredictionByUserId(req.params.userId);
  if (!prediction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Prediction not found');
  }
  res.send(prediction);
});

const getPredictionRecommendationsByUserID = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const darkPredictions = await getPredictionRecommendationsForUser(userId, 'dark');
  const lightPredictions = await getPredictionRecommendationsForUser(userId, 'light');
  const predictions = {
    dark: darkPredictions,
    light: lightPredictions,
  }; 

  if (!predictions) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Predictions not found');
  }
  res.send(predictions);
});

const getPredictionRecommendationsGeneral = catchAsync(async (req, res) => {
  const darkPredictions = await getPredictionRecommendationsForGeneral('dark');
  const lightPredictions = await getPredictionRecommendationsForGeneral('light');
  const predictions = {
    dark: darkPredictions,
    light: lightPredictions,
  }; 

  if (!predictions) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Predictions not found');
  }
  res.send(predictions);
});

const updatePrediction = catchAsync(async (req, res) => {
  const prediction = await predictionService.updatePredictionById(req.params.predictionId, req.body);
  res.send(prediction);
});

const deletePrediction = catchAsync(async (req, res) => {
  await predictionService.deletePredictionById(req.params.predictionId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPrediction,
  getPredictions,
  getPrediction,
  getPredictionByUserId,
  getPredictionRecommendationsByUserID,
  getPredictionRecommendationsGeneral,
  updatePrediction,
  deletePrediction,
};
