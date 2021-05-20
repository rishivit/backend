const httpStatus = require('http-status');
const { Prediction } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a prediction
 * @param {Object} predictionBody
 * @returns {Promise<Prediction>}
 */
const createPrediction = async (predictionBody) => {
  const prediction = await Prediction.create(predictionBody);
  return prediction;
};

/**
 * Query for predictions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPredictions = async (filter, options) => {
  const predictions = await Prediction.paginate(filter, options);
  return predictions;
};

/**
 * Get prediction by id
 * @param {ObjectId} id
 * @returns {Promise<Prediction>}
 */
const getPredictionById = async (id) => {
  return Prediction.findById(id);
};

/**
 * Get prediction by email
 * @param {string} email
 * @returns {Promise<Prediction>}
 */
const getPredictionByUserId = async (userId) => {
  return Prediction.find({ userId });
};

/**
 * Update prediction by id
 * @param {ObjectId} predictionId
 * @param {Object} updateBody
 * @returns {Promise<Prediction>}
 */
const updatePredictionById = async (predictionId, updateBody) => {
  const prediction = await getPredictionById(predictionId);
  if (!prediction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Prediction not found');
  }
  Object.assign(prediction, updateBody);
  await prediction.save();
  return prediction;
};

/**
 * Delete prediction by id
 * @param {ObjectId} predictionId
 * @returns {Promise<Prediction>}
 */
const deletePredictionById = async (predictionId) => {
  const prediction = await getPredictionById(predictionId);
  if (!prediction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Prediction not found');
  }
  await prediction.remove();
  return prediction;
};

module.exports = {
  createPrediction,
  queryPredictions,
  getPredictionById,
  getPredictionByUserId,
  updatePredictionById,
  deletePredictionById,
};
